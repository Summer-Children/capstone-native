export enum Section {
    Structure = 'Structure',
    BuildingEnclosure = 'Building Enclosure',
    Roofing = 'Roofing',
    Interior = 'Interior',
    FireProtection = 'Fire Protection',
    MechanicalSystems = 'Mechanical Systems',
    ElectricalSystems = 'Electrical Systems',
    Balconies = 'Balconies'
}

export enum Category {
    StructuralSystem = 'Structural System',
    ExteriorWalls = 'Exterior Walls',
    WindowsDoors = 'Windows & Doors',
    Roofing = 'Roofing',
    Balconies = 'Balconies',
    InteriorFinishes = 'Interior Finishes',
    FireSafetySystem = 'Fire Safety System',
    Suppression = 'Suppression',
    HeatingCooling = 'Heating & Cooling',
    Ventilation = 'Ventilation',
    Plumbing = 'Plumbing',
    Elevator = 'Elevator',
    Distribution = 'Distribution',
    Lighting = 'Lighting'
}

export interface Component {
    id: string
    name: string
    category: Category
    section: Section
}

const rawComponents = [
    { name: 'Foundation', category: Category.StructuralSystem, section: Section.Structure },
    { name: 'Slab on Grade', category: Category.StructuralSystem, section: Section.Structure },
    { name: 'Suspended Slab', category: Category.StructuralSystem, section: Section.Structure },
    { name: 'Superstructure', category: Category.StructuralSystem, section: Section.Structure },
    { name: 'Parking Garage Driveway', category: Category.StructuralSystem, section: Section.Structure },
    { name: 'Vinyl Siding Assembly', category: Category.ExteriorWalls, section: Section.BuildingEnclosure },
    { name: 'Fibre Cement Siding', category: Category.ExteriorWalls, section: Section.BuildingEnclosure },
    { name: 'Stone Veneer Cladding', category: Category.ExteriorWalls, section: Section.BuildingEnclosure },
    { name: 'Soffit Assembly', category: Category.ExteriorWalls, section: Section.BuildingEnclosure },
    { name: 'Exterior Painting', category: Category.ExteriorWalls, section: Section.BuildingEnclosure },
    { name: 'Windows & Sliding Doors', category: Category.WindowsDoors, section: Section.BuildingEnclosure },
    { name: 'Main Door', category: Category.WindowsDoors, section: Section.BuildingEnclosure },
    { name: 'Exterior Doors', category: Category.WindowsDoors, section: Section.BuildingEnclosure },
    { name: 'Garage Overhead Doors', category: Category.WindowsDoors, section: Section.BuildingEnclosure },
    { name: 'SBS Membrane Roofing', category: Category.Roofing, section: Section.Roofing },
    { name: 'Asphalt Shingle Roofing', category: Category.Roofing, section: Section.Roofing },
    { name: 'Podium Roof Assembly', category: Category.Roofing, section: Section.Roofing },
    { name: 'Glazed Metal Framed Canopy', category: Category.Roofing, section: Section.Roofing },
    { name: 'Balcony Membranes', category: Category.Balconies, section: Section.Balconies },
    { name: 'Guardrails', category: Category.Balconies, section: Section.Balconies },
    { name: 'Interior Corridor Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { name: 'Lobby Entrance Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { name: 'Stairwell Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { name: 'Storage Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { name: 'Guest Suites Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { name: 'Washroom Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { name: 'Fire Alarm Control Panel', category: Category.FireSafetySystem, section: Section.FireProtection },
    { name: 'Field Devices', category: Category.FireSafetySystem, section: Section.FireProtection },
    { name: 'Suppression System', category: Category.Suppression, section: Section.FireProtection },
    { name: 'Hydronic Heating System', category: Category.HeatingCooling, section: Section.MechanicalSystems },
    { name: 'Electric Baseboards', category: Category.HeatingCooling, section: Section.MechanicalSystems },
    { name: 'Make Up Air Unit', category: Category.Ventilation, section: Section.MechanicalSystems },
    { name: 'Parking Garage Ventilation', category: Category.Ventilation, section: Section.MechanicalSystems },
    { name: 'Service Room Ventilation', category: Category.Ventilation, section: Section.MechanicalSystems },
    { name: 'Water Distribution', category: Category.Plumbing, section: Section.MechanicalSystems },
    { name: 'Domestic Hot Water System', category: Category.Plumbing, section: Section.MechanicalSystems },
    { name: 'Drainage System', category: Category.Plumbing, section: Section.MechanicalSystems },
    { name: 'Sump Pumps', category: Category.Plumbing, section: Section.MechanicalSystems },
    { name: 'Irrigation System', category: Category.Plumbing, section: Section.MechanicalSystems },
    { name: 'Gas Piping', category: Category.Plumbing, section: Section.MechanicalSystems },
    { name: 'Elevator Controller & Equipment', category: Category.Elevator, section: Section.MechanicalSystems },
    { name: 'Elevator Cabin Finishes', category: Category.Elevator, section: Section.MechanicalSystems },
    { name: 'Supply Equipment', category: Category.Distribution, section: Section.ElectricalSystems },
    { name: 'Interior Lighting', category: Category.Lighting, section: Section.ElectricalSystems },
    { name: 'Exterior Lighting', category: Category.Lighting, section: Section.ElectricalSystems },
    { name: 'Emergency Lighting', category: Category.Lighting, section: Section.ElectricalSystems }
]

export const components: Component[] = rawComponents.map((el, i) => ({
    ...el,
    id: (i + 1).toString().padStart(2, '0')
}))
