# Car repair

# Repair Estimate 1: Basic
PARTS = {
    'front_bumper_without_headlamp_washers' => {
        'part_number' => 51117140859, 
        'estimate_cost' => 268
    },
    'front_fender' => {
        'part_number' => 41357135679, 
        'estimate_cost' => 726.07
    },
    'left_headlamp_assembly_without_adaptive_headlamp' => {
        'part_number' => 63117161665,
        "estimate_cost" => 184
    }
}.freeze

# White Oaks Collision Center in Campbell, CA: Repair Estimate 2
PARTS_TWO = {
    'front_bumper_cover' => '**QUALITY REPL PART', # $275 from estimate
    'left_front_bumper_cover_support' => 51117058447,
    'left_front_bumper_stiffener' => 51117134097,

    'front_fender' => "**QUALITY REPL PART", # $185 from estimate

    'right_front_combination_lamp_assembly' => 63117161670
}.freeze


CAR_MAKE_MODEL = {
    'year' => 2006,
    'make' => 'bmw',
    'model' => '325i',
    'body' => 'sedan',
    'drive' => 'rwd',
    'series' => 'e90', # (2004-2008)
    'engine' => 'n52',
    'door' => '4d',
    'liter' => 3,
    'cylinder' => 6,
    'exterior_color' => 'gray',   
    'vin' => 'WBAVB13556PT08288',
    'market' => 'usa',
    'type_code' => 'vb13',
    'prod_month' => '10/2005'
}.freeze


class FrontBumperCover 
    def initialize
        @cost = 403.52
        @link = 'http://www.realoem.com/bmw/enUS/showparts?id=VB13-USA-02_2004_E90_BMW_325i&diagId=51_5813#51117140859'
    end 
end 

class FrontFender 
    def initialize(side = 'left')
        @body_nut_count = 8
        @cost = 334.17 # USD from realoem
        @side = 'left'
        @link = 'http://www.realoem.com/bmw/enUS/showparts?id=VB13-USA-02_2004_E90_BMW_325i&diagId=41_1596#41357135679'
    end 


end 

class BodyNut < FrontFender
    def initialize
        @cost = 0.36 # USD
        @weight = 0.004 # kg
        @type = 'M6'
    end 
end 

class HexBoltWithWasher < FrontFender
    def initialize

    end 
end 