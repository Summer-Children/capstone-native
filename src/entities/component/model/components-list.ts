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
    actionFrequency: number
    unitRate: number
}

const rawComponents: Component[] = [
    {
        id: '01',
        name: 'Foundation',
        category: Category.StructuralSystem,
        section: Section.Structure,
        actionFrequency: 50,
        unitRate: 5000
    },
    {
        id: '02',
        name: 'Slab on Grade',
        category: Category.StructuralSystem,
        section: Section.Structure,
        actionFrequency: 50,
        unitRate: 3500
    },
    {
        id: '03',
        name: 'Suspended Slab',
        category: Category.StructuralSystem,
        section: Section.Structure,
        actionFrequency: 50,
        unitRate: 4000
    },
    {
        id: '04',
        name: 'Superstructure',
        category: Category.StructuralSystem,
        section: Section.Structure,
        actionFrequency: 50,
        unitRate: 6000
    },
    {
        id: '05',
        name: 'Parking Garage Driveway',
        category: Category.StructuralSystem,
        section: Section.Structure,
        actionFrequency: 45,
        unitRate: 2500
    },
    {
        id: '06',
        name: 'Vinyl Siding Assembly',
        category: Category.ExteriorWalls,
        section: Section.BuildingEnclosure,
        actionFrequency: 40,
        unitRate: 1500
    },
    {
        id: '07',
        name: 'Fibre Cement Siding',
        category: Category.ExteriorWalls,
        section: Section.BuildingEnclosure,
        actionFrequency: 45,
        unitRate: 2000
    },
    {
        id: '08',
        name: 'Stone Veneer Cladding',
        category: Category.ExteriorWalls,
        section: Section.BuildingEnclosure,
        actionFrequency: 50,
        unitRate: 3000
    },
    {
        id: '09',
        name: 'Soffit Assembly',
        category: Category.ExteriorWalls,
        section: Section.BuildingEnclosure,
        actionFrequency: 35,
        unitRate: 1200
    },
    {
        id: '10',
        name: 'Exterior Painting',
        category: Category.ExteriorWalls,
        section: Section.BuildingEnclosure,
        actionFrequency: 30,
        unitRate: 800
    },
    {
        id: '11',
        name: 'Windows & Sliding Doors',
        category: Category.WindowsDoors,
        section: Section.BuildingEnclosure,
        actionFrequency: 35,
        unitRate: 2500
    },
    {
        id: '12',
        name: 'Main Door',
        category: Category.WindowsDoors,
        section: Section.BuildingEnclosure,
        actionFrequency: 30,
        unitRate: 1800
    },
    {
        id: '13',
        name: 'Exterior Doors',
        category: Category.WindowsDoors,
        section: Section.BuildingEnclosure,
        actionFrequency: 30,
        unitRate: 1500
    },
    {
        id: '14',
        name: 'Garage Overhead Doors',
        category: Category.WindowsDoors,
        section: Section.BuildingEnclosure,
        actionFrequency: 35,
        unitRate: 2200
    },
    {
        id: '15',
        name: 'SBS Membrane Roofing',
        category: Category.Roofing,
        section: Section.Roofing,
        actionFrequency: 40,
        unitRate: 2500
    },
    {
        id: '16',
        name: 'Asphalt Shingle Roofing',
        category: Category.Roofing,
        section: Section.Roofing,
        actionFrequency: 35,
        unitRate: 1800
    },
    {
        id: '17',
        name: 'Podium Roof Assembly',
        category: Category.Roofing,
        section: Section.Roofing,
        actionFrequency: 45,
        unitRate: 3500
    },
    {
        id: '18',
        name: 'Glazed Metal Framed Canopy',
        category: Category.Roofing,
        section: Section.Roofing,
        actionFrequency: 35,
        unitRate: 2800
    },
    {
        id: '19',
        name: 'Balcony Membranes',
        category: Category.Balconies,
        section: Section.Balconies,
        actionFrequency: 35,
        unitRate: 1500
    },
    {
        id: '20',
        name: 'Guardrails',
        category: Category.Balconies,
        section: Section.Balconies,
        actionFrequency: 40,
        unitRate: 1200
    },
    {
        id: '21',
        name: 'Interior Corridor Finishes',
        category: Category.InteriorFinishes,
        section: Section.Interior,
        actionFrequency: 25,
        unitRate: 1000
    },
    {
        id: '22',
        name: 'Lobby Entrance Finishes',
        category: Category.InteriorFinishes,
        section: Section.Interior,
        actionFrequency: 25,
        unitRate: 1500
    },
    {
        id: '23',
        name: 'Stairwell Finishes',
        category: Category.InteriorFinishes,
        section: Section.Interior,
        actionFrequency: 30,
        unitRate: 900
    },
    {
        id: '24',
        name: 'Storage Finishes',
        category: Category.InteriorFinishes,
        section: Section.Interior,
        actionFrequency: 20,
        unitRate: 600
    },
    {
        id: '25',
        name: 'Guest Suites Finishes',
        category: Category.InteriorFinishes,
        section: Section.Interior,
        actionFrequency: 20,
        unitRate: 1200
    },
    {
        id: '26',
        name: 'Washroom Finishes',
        category: Category.InteriorFinishes,
        section: Section.Interior,
        actionFrequency: 20,
        unitRate: 1500
    },
    {
        id: '27',
        name: 'Fire Alarm Control Panel',
        category: Category.FireSafetySystem,
        section: Section.FireProtection,
        actionFrequency: 60,
        unitRate: 4000
    },
    {
        id: '28',
        name: 'Field Devices',
        category: Category.FireSafetySystem,
        section: Section.FireProtection,
        actionFrequency: 55,
        unitRate: 2500
    },
    {
        id: '29',
        name: 'Suppression System',
        category: Category.Suppression,
        section: Section.FireProtection,
        actionFrequency: 60,
        unitRate: 5000
    },
    {
        id: '30',
        name: 'Hydronic Heating System',
        category: Category.HeatingCooling,
        section: Section.MechanicalSystems,
        actionFrequency: 45,
        unitRate: 3500
    },
    {
        id: '31',
        name: 'Electric Baseboards',
        category: Category.HeatingCooling,
        section: Section.MechanicalSystems,
        actionFrequency: 40,
        unitRate: 1200
    },
    {
        id: '32',
        name: 'Make Up Air Unit',
        category: Category.Ventilation,
        section: Section.MechanicalSystems,
        actionFrequency: 45,
        unitRate: 4000
    },
    {
        id: '33',
        name: 'Parking Garage Ventilation',
        category: Category.Ventilation,
        section: Section.MechanicalSystems,
        actionFrequency: 45,
        unitRate: 3000
    },
    {
        id: '34',
        name: 'Service Room Ventilation',
        category: Category.Ventilation,
        section: Section.MechanicalSystems,
        actionFrequency: 40,
        unitRate: 2000
    },
    {
        id: '35',
        name: 'Water Distribution',
        category: Category.Plumbing,
        section: Section.MechanicalSystems,
        actionFrequency: 50,
        unitRate: 3500
    },
    {
        id: '36',
        name: 'Domestic Hot Water System',
        category: Category.Plumbing,
        section: Section.MechanicalSystems,
        actionFrequency: 45,
        unitRate: 4000
    },
    {
        id: '37',
        name: 'Drainage System',
        category: Category.Plumbing,
        section: Section.MechanicalSystems,
        actionFrequency: 50,
        unitRate: 3000
    },
    {
        id: '38',
        name: 'Sump Pumps',
        category: Category.Plumbing,
        section: Section.MechanicalSystems,
        actionFrequency: 55,
        unitRate: 2500
    },
    {
        id: '39',
        name: 'Irrigation System',
        category: Category.Plumbing,
        section: Section.MechanicalSystems,
        actionFrequency: 30,
        unitRate: 1800
    },
    {
        id: '40',
        name: 'Gas Piping',
        category: Category.Plumbing,
        section: Section.MechanicalSystems,
        actionFrequency: 55,
        unitRate: 2500
    },
    {
        id: '41',
        name: 'Elevator Controller & Equipment',
        category: Category.Elevator,
        section: Section.MechanicalSystems,
        actionFrequency: 60,
        unitRate: 8000
    },
    {
        id: '42',
        name: 'Elevator Cabin Finishes',
        category: Category.Elevator,
        section: Section.MechanicalSystems,
        actionFrequency: 35,
        unitRate: 3000
    },
    {
        id: '43',
        name: 'Supply Equipment',
        category: Category.Distribution,
        section: Section.ElectricalSystems,
        actionFrequency: 55,
        unitRate: 4500
    },
    {
        id: '44',
        name: 'Interior Lighting',
        category: Category.Lighting,
        section: Section.ElectricalSystems,
        actionFrequency: 40,
        unitRate: 1500
    },
    {
        id: '45',
        name: 'Exterior Lighting',
        category: Category.Lighting,
        section: Section.ElectricalSystems,
        actionFrequency: 45,
        unitRate: 2000
    },
    {
        id: '46',
        name: 'Emergency Lighting',
        category: Category.Lighting,
        section: Section.ElectricalSystems,
        actionFrequency: 60,
        unitRate: 2500
    }
]

export const components: Component[] = rawComponents.map((el, i) => ({
    ...el,
    id: (i + 1).toString().padStart(2, '0')
}))
