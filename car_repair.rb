# Car repair

# Repair Estimate 1: Basic
PARTS = {
    'front_bumper_cover_without_headlamp_washers' => {
        'part_number' => 51117140859, 
        'estimate_cost' => 268
    },
    'front_fender' => {
        'part_number' => 41357135679, 
        'estimate_cost' => 184
    },
    'left_headlamp_assembly_without_adaptive_headlamp' => {
        'part_number' => 63117161665,
        "estimate_cost" => 727
    }
}.freeze

# White Oaks Collision Center in Campbell, CA: Repair Estimate 2
PARTS_TWO = {
    'front_bumper_cover' => {
        'part_number' => '**QUALITY REPL PART', 
        'estimate_cost' => 275, 
        'left_front_bumper_cover_support' => {
            'part_number' => 51117058447,
            'estimate_cost' => 7
        },
        'left_front_bumper_stiffener' => {
            'part_number' => 51117134097,
            'estimate_cost' => 8
        }
    },
    'front_fender' => {
        'part_number' => "**QUALITY REPL PART", 
        'estimate_cost' => 185,
        'left_fender_front_splash_shield' => 82
    },
    'left_front_combination_lamp_assembly' => {
        'part_number' => 63117161669,
        'estimate_cost' => 1343,
        'left_headlamp_bracket' => {
            'part_number' => 51647116707,
            'estimate_cost' => 62
        }
    }
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
        @oem_cost = 410
        @oem_url = 'http://www.realoem.com/bmw/enUS/showparts?id=VB13-USA-02_2004_E90_BMW_325i&diagId=51_5813#51117140859'
    
        @ebay_cost = 100
        @ebay_url = 'https://www.ebay.com/sch/i.html?_odkw=51117140859+2006+BMW+325i+Base+3.0L&_dmd=1&_osacat=0&_from=R40&_trksid=p2045573.m570.l1313.TR0.TRC0.H0.X51117140859+2006+BMW+325i+Base+3.0L+gray.TRS0&_nkw=51117140859+2006+BMW+325i+Base+3.0L+gray&_sacat=0'
    end 
end 

class HeadLight 
    def initialize(side = 'left')
        @side = side
        @oem_cost = 940 # bi-xenon w/out adaptive headlamp
        @oem_adapt_cost = 1100 # bi-xenon w/ adaptive headlamp
        @oem_url = 'http://www.realoem.com/bmw/enUS/showparts?id=VB13-USA-02_2004_E90_BMW_325i&diagId=63_0907#63117161665'

        # bi-xenon w/out adaptive headlamp
        @ebay_cost = 600 
        @ebay_url = 'https://www.ebay.com/sch/Headlights-/33710/i.html?_from=R40&_dcat=33710&Bulb%2520Type=Xenon&mvsub=1&_mcatda=true&selcontext=productType%3ACAR_AND_TRUCK&selfil=1%2C2%2C3%2C4%2C5&selvel=2006~BMW~325i~Base%2520Sedan%25204-Door~3.0L%25202996CC%2520l6%2520GAS%2520DOHC%2520Naturally%2520Aspirated~Base~3.0L&_nkw=63117161665%202006%20BMW%20325i%20Base%203.0L'
        
        # bi-xenon w/ adaptive headlamp
        @ebay_adapt_cost = 780
        @ebay_adapt_url = 'https://www.ebay.com/sch/i.html?_odkw=63117161665+2006+BMW+325i+Base+3.0L&Bulb%2520Type=Xenon&_dcat=33710&_osacat=33710&_from=R40&_trksid=p2045573.m570.l1313.TR0.TRC0.H0.X63117161669+2006+BMW+325i+Base+3.0L.TRS0&_nkw=63117161669+2006+BMW+325i+Base+3.0L&_sacat=33710'
    end 
end 



class FrontSidePanel 
    def initialize(side = 'left')
        @side = side

        # additional parts needed to install
        @body_nut_count = 8
        @hexbolt_with_washer_count = 16
        
        @oem_cost = 340
        @oem_url = 'http://www.realoem.com/bmw/enUS/showparts?id=VB13-USA-02_2004_E90_BMW_325i&diagId=41_1596#41357135679'
        
        @ebay_cost = 70
        @ebay_url = 'https://www.ebay.com/sch/Fenders/33644/i.html?_from=R40&_nkw=41357135679+2006+BMW+325i+Base+3.0L&rt=nc&_dmd=2'
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