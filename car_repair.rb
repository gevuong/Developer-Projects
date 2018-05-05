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

class HeadLight 
    def initialize(side = 'left')
        @side = side
        @oem_cost = 938.57 # bi-xenon w/out adaptive headlamp
        @oem_two_cost = 1096.95 # bi-xenon w/ adaptive headlamp
        @ebay_cost = 592.95 # bi-xenon w/out adaptive headlamp
        @oem_link = 'http://www.realoem.com/bmw/enUS/showparts?id=VB13-USA-02_2004_E90_BMW_325i&diagId=63_0907#63117161665'
        @ebay_link = 'https://www.ebay.com/itm/For-BMW-325i-328i-330i-335i-xi-Bi-Xenon-Hella-Left-Side-Headlight-Assembly/323177359364?fits=Year%3A2006%7CMake%3ABMW%7CModel%3A325i%7CSubmodel%3ABase%7CEngine+-+Liter_Display%3A3.0L%7CTrim%3ABase+Sedan+4-Door%7CEngine%3A3.0L+2996CC+l6+GAS+DOHC+Naturally+Aspirated&epid=2235313231&hash=item4b3edf2804:g:gjsAAOSwUN9avOtt&vxp=mtr'
    end 
end 

class FrontSidePanel 
    def initialize(side = 'left')
        @body_nut_count = 8
        @hexbolt_with_washer_count = 16
        @oem_cost = 334.17 # USD from realoem
        @oem_link = 'http://www.realoem.com/bmw/enUS/showparts?id=VB13-USA-02_2004_E90_BMW_325i&diagId=41_1596#41357135679'
        @ebay_cost = 51
        @ebay_link = ''
        @side = 'left'
    end 
end 

class BodyNut < FrontSidePanel
    def initialize
        @type = 'M6'
        @part = '07147133884'
        @cost = 0.36
    end 
end 

class HexBoltWithWasher < FrontSidePanel
    def initialize
        @type = 'M6X12'
        @part = '07147147513'
        @cost = 0.38
    end 
end 