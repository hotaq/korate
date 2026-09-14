# 3D Features Guide - Interactive Elements

## 🖱️ User Interactions

### Camera Controls (OrbitControls)
- **Rotate**: Click and drag
- **Zoom**: Scroll wheel
- **Pan**: Shift + Click and drag
- **Reset**: Reload page

### Window Interaction
1. **Click on window** → Opens control modal
2. **Modal Actions**:
   - Open Window button
   - Close Window button
   - Done button
3. **Keyboard Shortcuts** (when modal is open):
   - `O` - Open window
   - `C` - Close window
   - `Enter` - Toggle window
   - `Esc` - Close modal

## 🎨 Visual Elements Map

### Room Layout (12m x 12m x 6m high)

```
                    BACK WALL (-Z = -6)
    ╔════════════════════════════════════════════╗
    ║  [Art]      [Art]         [Emergency Btn]  ║
    ║                                             ║
    ║                                             ║
LEFT║  [Window]        [Bed]        [Monitor]    ║RIGHT
WALL║  + Curtains     + Patient                  ║WALL
(-X)║                 + Blanket                   ║(+X)
    ║  [IV Stand]   [Nightstand]                 ║
    ║              + Lamp                         ║
    ║                                    [Chair]  ║
    ║                              [Door]         ║
    ╚════════════════════════════════════════════╝
                   FRONT/ENTRANCE
```

### Component Positions

#### Medical Equipment
- **Medical Monitor**: `[1.5, 0, -3.5]` - Right side near bed
- **IV Stand**: `[-4, 0, -2.5]` - Left side of bed head

#### Furniture
- **Bed**: `[-2.5, 0, -2]` - Left-center of room
- **Nightstand**: `[1.5, 0, -3.2]` - Right of bed
- **Chair**: `[3.8, 0, 0]` - Near entrance

#### Fixtures
- **Window**: `[-6, 3.5, -2]` - Left wall, mid-height
- **Door**: `[6, 0, -2]` - Right wall (swings open)
- **Ceiling Light 1**: `[-2, 5.9, -2]` - Over bed area
- **Ceiling Light 2**: `[2, 5.9, 2]` - Near entrance
- **Wall Art 1**: `[0, 4, -5.98]` - Back wall, high
- **Wall Art 2**: `[3, 3.5, -5.98]` - Back wall, lower
- **Emergency Button**: `[-1, 1.5, -5.95]` - Near bed, reachable

## 🎭 State-Responsive Elements

### Lighting (`roomData.lighting`)
**When TRUE** (Lights On):
- Ceiling lights glow with yellow tint
- Point lights intensity: 0.8
- Ambient light brighter
- Room well-lit

**When FALSE** (Lights Off):
- Ceiling lights dim
- Point lights intensity: 0.25
- Ambient light darker
- Room in twilight/night mode

### Window (`roomData.windowOpen`)
**When TRUE** (Open):
- Curtains slide apart (left/right)
- Glass becomes more transparent (30% opacity)
- Blue natural light streams in
- Additional spotlight effect

**When FALSE** (Closed):
- Curtains meet in center
- Glass less transparent (60% opacity)
- No external light
- Window appears closed

### Door (`roomData.doorOpen`)
**When TRUE** (Open):
- Door swings outward (-π/2.5 radians)
- Smooth animation over ~1 second

**When FALSE** (Closed):
- Door in closed position (0 radians)
- Blocks doorway

### Occupancy (`roomData.occupancy`)
**When TRUE** (Patient Present):
- Patient head visible on pillow
- Body shape under blanket
- Medical monitor shows green screen
- Heartbeat indicator pulses (red dot)

**When FALSE** (Room Vacant):
- No patient visible
- Medical monitor shows dark screen
- No heartbeat animation

### Emergency (`roomData.emergency`)
**When TRUE** (Emergency Active):
- Emergency button glows bright red
- Red emissive material
- Pulsing red point light
- High alert visual

**When FALSE** (Normal):
- Button light red (inactive)
- No glow
- No point light

## 📐 Material Specifications

### Wood
- **Type**: Procedural texture (512x512, 2x2 repeat)
- **Color**: `#8b7355` (saddle brown)
- **Used on**: Floor, furniture, door, frames
- **Properties**: Roughness: 0.6-0.9, Metalness: 0.0-0.1

### Fabric
- **Type**: Procedural texture (256x256)
- **Color**: `#ecf4ff` (light blue-white)
- **Used on**: Mattress, curtains, chair
- **Properties**: Roughness: 0.7-0.9, Metalness: 0.1

### Metal (Chrome)
- **Color**: `#c0c0c0` to `#d0d0d0` (silver)
- **Used on**: IV stand, monitor stand, bed rails, handles
- **Properties**: Metalness: 0.7-0.9, Roughness: 0.1-0.3

### Metal (Gold/Brass)
- **Color**: `#d4af37` (gold)
- **Used on**: Door knob, curtain rod
- **Properties**: Metalness: 0.8-0.9, Roughness: 0.1-0.2

### Glass
- **Color**: `#add8e6` (light blue)
- **Used on**: Windows, IV bag
- **Properties**: Transparent, Opacity: 0.3-0.6, Metalness: 0.9, Roughness: 0.1

## 🔄 Animations

### Continuous Animations
1. **IV Bag Sway**: `sin(time * 0.5) * 0.05` radians
2. **Heartbeat Pulse**: `sin(time * 2) * 0.02 + 1` scale (when occupied)

### State-Triggered Animations (Lerp-based)
1. **Door Swing**: Lerp to target angle, speed: 0.1
2. **Curtains Slide**: Lerp to target position, speed: 0.05

### Lighting Effects
- **Ceiling Light Glow**: Appears when intensity > 0.5
- **Emergency Light Pulse**: Active during emergency
- **Monitor Screen Pulse**: Heartbeat sync with patient

## 🎯 Interaction Zones

### Clickable
- **Window Area**: Opens modal for window control

### Hover Effects
- **Window Frame**: Changes color on hover (`#9a8060` → `#8b7355`)
- **Cursor Change**: Pointer cursor over window

## 💡 Lighting Details

### Light Types & Purposes
1. **Ambient**: Overall base illumination
2. **Directional**: Main sun/room light
3. **Hemisphere**: Sky-ground color blend
4. **Ceiling Point Lights**: Room overhead lighting
5. **Window Lights**: Natural light simulation
6. **Table Lamp**: Task lighting
7. **Emergency Light**: Alert indicator

### Shadow Configuration
- **Resolution**: 2048 x 2048 pixels
- **Camera Bounds**: -10 to 10 (all axes)
- **Far Plane**: 20 units
- **Quality**: High fidelity shadows

## 📱 Responsive Design

The 3D canvas is:
- **Size**: 100% width × 480px height
- **Background**: White
- **Border Radius**: 0.75rem (rounded-xl)
- **Overflow**: Hidden

### UI Overlay
- **Position**: Top-right corner
- **Content**: Control instructions
- **Style**: Semi-transparent white background

## 🎨 Color Palette

| Element | Color | Hex | Purpose |
|---------|-------|-----|---------|
| Floor | Saddle Brown | `#8b7355` | Wood texture base |
| Walls | Light Gray | `#eef2f7`, `#f7fafc` | Clean, clinical |
| Ceiling | White | `#ffffff` | Bright, open |
| Bed Frame | Dark Gray | `#555555` | Metal frame |
| Mattress | White | `#ffffff` | Clean linens |
| Blanket | Light Blue | `#add8e6` | Calming color |
| Patient Skin | Peach | `#ffdbac` | Realistic skin tone |
| Window Glass | Sky Blue | `#add8e6` | Natural light |
| Curtains | Blue | `#4a90e2`, `#5a9cf2` | Matching decor |
| Door | Light Wood | `#d4a574` | Warm tone |
| Monitor Screen | Green | `#00ff88` | Medical display |
| Emergency | Red | `#ff0000` | Alert |

## 🔧 Technical Notes

### Performance Optimizations
- Textures cached with `useMemo`
- Efficient lerp animations
- Optimized shadow rendering
- Component-based architecture

### Camera Setup
- **Initial Position**: `[7, 4, 7]`
- **Initial Target**: `[0, 1.2, -2]`
- **FOV**: 50 degrees
- **Min Distance**: 4 units
- **Max Distance**: 20 units

---

**Usage**: Run `npm run dev` to see all features in action!
