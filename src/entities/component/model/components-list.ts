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
    { id: '01', name: 'Foundation', category: Category.StructuralSystem, section: Section.Structure },
    { id: '02', name: 'Slab on Grade', category: Category.StructuralSystem, section: Section.Structure },
    { id: '03', name: 'Suspended Slab', category: Category.StructuralSystem, section: Section.Structure },
    { id: '04', name: 'Superstructure', category: Category.StructuralSystem, section: Section.Structure },
    { id: '05', name: 'Parking Garage Driveway', category: Category.StructuralSystem, section: Section.Structure },
    { id: '06', name: 'Vinyl Siding Assembly', category: Category.ExteriorWalls, section: Section.BuildingEnclosure },
    { id: '07', name: 'Fibre Cement Siding', category: Category.ExteriorWalls, section: Section.BuildingEnclosure },
    { id: '08', name: 'Stone Veneer Cladding', category: Category.ExteriorWalls, section: Section.BuildingEnclosure },
    { id: '09', name: 'Soffit Assembly', category: Category.ExteriorWalls, section: Section.BuildingEnclosure },
    { id: '10', name: 'Exterior Painting', category: Category.ExteriorWalls, section: Section.BuildingEnclosure },
    { id: '11', name: 'Windows & Sliding Doors', category: Category.WindowsDoors, section: Section.BuildingEnclosure },
    { id: '12', name: 'Main Door', category: Category.WindowsDoors, section: Section.BuildingEnclosure },
    { id: '13', name: 'Exterior Doors', category: Category.WindowsDoors, section: Section.BuildingEnclosure },
    { id: '14', name: 'Garage Overhead Doors', category: Category.WindowsDoors, section: Section.BuildingEnclosure },
    { id: '15', name: 'SBS Membrane Roofing', category: Category.Roofing, section: Section.Roofing },
    { id: '16', name: 'Asphalt Shingle Roofing', category: Category.Roofing, section: Section.Roofing },
    { id: '17', name: 'Podium Roof Assembly', category: Category.Roofing, section: Section.Roofing },
    { id: '18', name: 'Glazed Metal Framed Canopy', category: Category.Roofing, section: Section.Roofing },
    { id: '19', name: 'Balcony Membranes', category: Category.Balconies, section: Section.Balconies },
    { id: '20', name: 'Guardrails', category: Category.Balconies, section: Section.Balconies },
    { id: '21', name: 'Interior Corridor Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { id: '22', name: 'Lobby Entrance Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { id: '23', name: 'Stairwell Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { id: '24', name: 'Storage Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { id: '25', name: 'Guest Suites Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    { id: '26', name: 'Washroom Finishes', category: Category.InteriorFinishes, section: Section.Interior },
    {
        id: '27',
        name: 'Fire Alarm Control Panel',
        category: Category.FireSafetySystem,
        section: Section.FireProtection
    },
    { id: '28', name: 'Field Devices', category: Category.FireSafetySystem, section: Section.FireProtection },
    { id: '29', name: 'Suppression System', category: Category.Suppression, section: Section.FireProtection },
    {
        id: '30',
        name: 'Hydronic Heating System',
        category: Category.HeatingCooling,
        section: Section.MechanicalSystems
    },
    { id: '31', name: 'Electric Baseboards', category: Category.HeatingCooling, section: Section.MechanicalSystems },
    { id: '32', name: 'Make Up Air Unit', category: Category.Ventilation, section: Section.MechanicalSystems },
    {
        id: '33',
        name: 'Parking Garage Ventilation',
        category: Category.Ventilation,
        section: Section.MechanicalSystems
    },
    { id: '34', name: 'Service Room Ventilation', category: Category.Ventilation, section: Section.MechanicalSystems },
    { id: '35', name: 'Water Distribution', category: Category.Plumbing, section: Section.MechanicalSystems },
    { id: '36', name: 'Domestic Hot Water System', category: Category.Plumbing, section: Section.MechanicalSystems },
    { id: '37', name: 'Drainage System', category: Category.Plumbing, section: Section.MechanicalSystems },
    { id: '38', name: 'Sump Pumps', category: Category.Plumbing, section: Section.MechanicalSystems },
    { id: '39', name: 'Irrigation System', category: Category.Plumbing, section: Section.MechanicalSystems },
    { id: '40', name: 'Gas Piping', category: Category.Plumbing, section: Section.MechanicalSystems },
    {
        id: '41',
        name: 'Elevator Controller & Equipment',
        category: Category.Elevator,
        section: Section.MechanicalSystems
    },
    { id: '42', name: 'Elevator Cabin Finishes', category: Category.Elevator, section: Section.MechanicalSystems },
    { id: '43', name: 'Supply Equipment', category: Category.Distribution, section: Section.ElectricalSystems },
    { id: '44', name: 'Interior Lighting', category: Category.Lighting, section: Section.ElectricalSystems },
    { id: '45', name: 'Exterior Lighting', category: Category.Lighting, section: Section.ElectricalSystems },
    { id: '46', name: 'Emergency Lighting', category: Category.Lighting, section: Section.ElectricalSystems }
]

export const components: Component[] = rawComponents.map((el, i) => ({
    ...el,
    id: (i + 1).toString().padStart(2, '0')
}))
