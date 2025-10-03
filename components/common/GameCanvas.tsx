import React, { useMemo, forwardRef } from 'react';
import { Vec2, Projectile, Enemy, Particle, Platform, BreakableBlock, EmojiStructure, FloatingText, Level, HoverableEntity, EnemyType, Wormhole, BlackHole } from '../../types';
import { WORLD_WIDTH, WORLD_HEIGHT, GROUND_Y } from '../../constants';
import { ENEMY_CONFIG } from '../../services/GameEngine';
import { TYPE_EMOJI_MAP } from '../ProjectileSelector';

type Entities = {
    platforms: Partial<Platform>[];
    breakableBlocks: Partial<BreakableBlock>[];
    enemies: Partial<Enemy>[];
    emojiStructures: Partial<EmojiStructure>[];
    projectiles: Projectile[];
    particles: Particle[];
    floatingTexts: FloatingText[];
    wormholes: Wormhole[];
    blackHoles: BlackHole[];
}

interface GameCanvasProps {
    levelTheme?: Level['theme'];
    shake?: { intensity: number; duration: number };
    parallaxOffset?: Vec2;
    zoom?: number;
    viewOffset?: Vec2;
    entities: Entities;
    isEditing: boolean;
    selectedObjectId?: string | null;
    onEntityHover?: (entity: HoverableEntity, e: React.MouseEvent) => void;
    onEntityLeave?: () => void;
    onMouseDown?: (e: React.MouseEvent, svg: SVGSVGElement | null) => void;
    onMouseMove?: (e: React.MouseEvent, svg: SVGSVGElement | null) => void;
    onMouseUp?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent, svg: SVGSVGElement | null) => void;
}

const GameCanvas = forwardRef<SVGSVGElement, GameCanvasProps>(({
    levelTheme, shake = { intensity: 0, duration: 0 }, parallaxOffset = { x: 0, y: 0 },
    zoom = 1, viewOffset = { x: 0, y: 0 }, entities, isEditing, selectedObjectId,
    onEntityHover, onEntityLeave, onMouseDown, onMouseMove, onMouseUp, onContextMenu
}, ref) => {
    
    const svgRef = React.useRef<SVGSVGElement>(null);

    const renderSky = () => {
        const defaultSky: [string, string, string] = ['#2d3748', '#4a5568', '#718096'];
        const sky = levelTheme?.sky || defaultSky;
        const [start, mid, end] = sky;
        
        // Use parallax only if a theme is present, otherwise use a centered gradient
        const useParallax = !!levelTheme;
        const parallaxX = useParallax ? 50 + parallaxOffset.x * 0.02 : 50;
        const parallaxY = useParallax ? 80 + parallaxOffset.y * 0.02 : 80;
    
        return (
            <>
                <defs>
                    <radialGradient id="skyGradient" cx={`${parallaxX}%`} cy={`${parallaxY}%`} r="100%" fx="50%" fy="100%">
                        <stop offset="0%" style={{stopColor: end}} />
                        <stop offset="40%" style={{stopColor: mid}} />
                        <stop offset="100%" style={{stopColor: start}} />
                    </radialGradient>
                </defs>
                <rect width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="url(#skyGradient)" />
            </>
        );
    };

    const getObjectBoundingBox = (obj: any): {x: number, y: number, width: number, height: number} => {
        if (obj.radius) { // Enemy, Wormhole, BlackHole
            const radius = obj.radius;
            return { x: obj.position.x - radius, y: obj.position.y - radius, width: radius * 2, height: radius * 2 };
        }
        if (obj.fontSize) { // EmojiStructure
            return { x: obj.position.x - obj.fontSize / 2, y: obj.position.y - obj.fontSize / 2, width: obj.fontSize, height: obj.fontSize };
        }
        // Platform or BreakableBlock
        return { x: obj.position.x, y: obj.position.y, width: obj.width, height: obj.height };
    };

    const renderSelectionBox = () => {
        if (!isEditing || !selectedObjectId) return null;
        const allObjects = [...entities.enemies, ...entities.platforms, ...entities.breakableBlocks, ...entities.emojiStructures, ...entities.wormholes, ...entities.blackHoles];
        const selectedObject = allObjects.find(o => o!.id === selectedObjectId);
        if (!selectedObject) return null;

        const box = getObjectBoundingBox(selectedObject);
        const handleSize = 8 / zoom;

        const handles = [
            { name: 'top-left', x: box.x, y: box.y, cursor: 'nwse-resize' },
            { name: 'top-center', x: box.x + box.width / 2, y: box.y, cursor: 'ns-resize' },
            { name: 'top-right', x: box.x + box.width, y: box.y, cursor: 'nesw-resize' },
            { name: 'middle-left', x: box.x, y: box.y + box.height / 2, cursor: 'ew-resize' },
            { name: 'middle-right', x: box.x + box.width, y: box.y + box.height / 2, cursor: 'ew-resize' },
            { name: 'bottom-left', x: box.x, y: box.y + box.height, cursor: 'nesw-resize' },
            { name: 'bottom-center', x: box.x + box.width / 2, y: box.y + box.height, cursor: 'ns-resize' },
            { name: 'bottom-right', x: box.x + box.width, y: box.y + box.height, cursor: 'nwse-resize' },
        ];

        return (
            <g>
                <rect 
                    x={box.x} y={box.y} width={box.width} height={box.height} 
                    fill="none" stroke="cyan" strokeWidth={2 / zoom} 
                    strokeDasharray={`${4/zoom}, ${2/zoom}`} 
                    style={{pointerEvents: 'none'}} 
                />
                {handles.map(h => (
                    <rect 
                        key={h.name} 
                        x={h.x - handleSize / 2} 
                        y={h.y - handleSize / 2} 
                        width={handleSize} 
                        height={handleSize} 
                        fill="cyan" 
                        stroke="black"
                        strokeWidth={0.5 / zoom}
                        style={{ cursor: h.cursor }}
                        data-handle={h.name}
                    />
                ))}
            </g>
        );
    };

    const getTransform = (entity: any) => {
        const scaleX = entity.scale?.x ?? 1;
        const scaleY = entity.scale?.y ?? 1;
        if (scaleX === 1 && scaleY === 1) return '';
        
        let cx, cy;
        if (entity.radius || entity.fontSize) { // Enemy or EmojiStructure (centered)
             cx = entity.position.x;
             cy = entity.position.y;
        } else { // Platform or BreakableBlock (top-left origin)
             cx = entity.position.x + entity.width / 2;
             cy = entity.position.y + entity.height / 2;
        }
        return `translate(${cx}, ${cy}) scale(${scaleX}, ${scaleY}) translate(${-cx}, ${-cy})`;
    };

    const shakeTransform = shake.duration > 0 ? `translate(${(Math.random() - 0.5) * 2 * shake.intensity}px, ${(Math.random() - 0.5) * 2 * shake.intensity}px)` : '';

    return (
        <svg 
            ref={svgRef}
            viewBox={`${viewOffset.x} ${viewOffset.y} ${WORLD_WIDTH / zoom} ${WORLD_HEIGHT / zoom}`} 
            className="h-full w-auto absolute inset-0" 
            style={{ maxHeight: '100vh', maxWidth: '100vw', transform: shakeTransform, cursor: isEditing ? 'default' : 'auto' }}
            onMouseDown={e => onMouseDown && onMouseDown(e, svgRef.current)}
            onMouseMove={e => onMouseMove && onMouseMove(e, svgRef.current)}
            onMouseUp={onMouseUp}
            onContextMenu={e => onContextMenu && onContextMenu(e, svgRef.current)}
        >
            {renderSky()}
            <rect x="0" y={GROUND_Y} width={WORLD_WIDTH} height={WORLD_HEIGHT - GROUND_Y} fill="#4a3b2b" />
            <rect x="0" y={GROUND_Y} width={WORLD_WIDTH} height="20" fill="#6a563f" />
            
            {entities.platforms?.map(p => p && <rect key={p.id} x={p.position!.x} y={p.position!.y} width={p.width} height={p.height} fill="#6b7280" stroke="#4b5563" strokeWidth="2" onMouseEnter={(e) => onEntityHover && onEntityHover(p as Platform, e)} onMouseLeave={onEntityLeave} transform={getTransform(p)} />)}
            {entities.breakableBlocks?.map(b => b && <rect key={b.id} x={b.position!.x} y={b.position!.y} width={b.width} height={b.height} fill="#a16207" stroke="#451a03" strokeWidth="2" onMouseEnter={(e) => onEntityHover && onEntityHover(b as BreakableBlock, e)} onMouseLeave={onEntityLeave} transform={getTransform(b)} />)}
            {entities.emojiStructures?.map(s => s && <text key={s.id} x={s.position!.x} y={s.position!.y} fontSize={s.fontSize} textAnchor="middle" dominantBaseline="central" onMouseEnter={(e) => onEntityHover && onEntityHover(s as EmojiStructure, e)} onMouseLeave={onEntityLeave} transform={getTransform(s)}>{s.emoji}</text>)}
            
            {entities.wormholes?.map(w => w && <text key={w.id} x={w.position.x} y={w.position.y} fontSize={w.radius * 2} textAnchor="middle" dominantBaseline="central" onMouseEnter={(e) => onEntityHover && onEntityHover(w, e)} onMouseLeave={onEntityLeave}>{w.type === 'black' ? '🟠' : '⚪'}</text>)}
            {entities.blackHoles?.map(b => b && <g key={b.id}><circle cx={b.position.x} cy={b.position.y} r={b.gravityRadius} fill="rgba(100,100,100,0.05)" style={{pointerEvents: 'none'}} /><text x={b.position.x} y={b.position.y} fontSize={b.radius * 2} textAnchor="middle" dominantBaseline="central" onMouseEnter={(e) => onEntityHover && onEntityHover(b, e)} onMouseLeave={onEntityLeave}>⚫</text></g>)}

            {entities.enemies.map(enemy => {
                if (!enemy || !enemy.type || !enemy.position) return null;
                const maxHealth = ENEMY_CONFIG[enemy.type].health;
                const healthPercentage = maxHealth ? Math.max(0, enemy.health!) / maxHealth : 1;
                const radius = enemy.radius || ENEMY_CONFIG[enemy.type].radius;
                const barWidth = radius! * 1.5;
                const healthColor = healthPercentage > 0.5 ? '#4ade80' : healthPercentage > 0.2 ? '#facc15' : '#ef4444';

                return (
                  <g key={enemy.id} onMouseEnter={(e) => onEntityHover && onEntityHover(enemy as Enemy, e)} onMouseLeave={onEntityLeave} transform={getTransform(enemy)}>
                      <text x={enemy.position.x} y={enemy.position.y} fontSize={radius! * 2} textAnchor="middle" dominantBaseline="central" style={{ opacity: (enemy.type === 'ghost' && !(enemy as Enemy).isSolid) ? 0.5 : 1, transition: 'opacity 0.1s' }}>{enemy.emoji}</text>
                      {!isEditing && (
                        <g transform={`translate(${enemy.position.x - barWidth / 2}, ${enemy.position.y + radius! + 5})`}>
                            <rect width={barWidth} height={8} fill="#3f3f46" rx="4" ry="4" stroke="#18181b" strokeWidth="1" />
                            <rect width={barWidth * healthPercentage} height={8} fill={healthColor} rx="4" ry="4" style={{ transition: 'width 0.2s ease' }} />
                        </g>
                      )}
                  </g>
                );
            })}

            {entities.projectiles.map(p => <text key={p.id} x={p.position.x} y={p.position.y} fontSize={p.radius * 2.5} textAnchor="middle" dominantBaseline="central">{TYPE_EMOJI_MAP[p.projectileType]}</text>)}
            {entities.particles.map(p => <circle key={p.id} cx={p.position.x} cy={p.position.y} r={p.radius} fill={p.color} style={{ opacity: p.lifespan / 60 }} />)}
            {entities.floatingTexts.map(t => <text key={t.id} x={t.position.x} y={t.position.y} fill={t.color} fontSize="24" fontWeight="bold" textAnchor="middle" style={{ opacity: t.lifespan / 60, pointerEvents: 'none', textShadow: '1px 1px 2px black' }}>{t.text}</text>)}

            {renderSelectionBox()}
        </svg>
    );
});

export default GameCanvas;