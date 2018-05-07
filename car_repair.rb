# Car repair

# Repair Estimate 1: Kim's Auto Body
PARTS = {
    'front_bumper_cover_without_headlamp_washers' => {
        'part_num' => 51117140859, 
        'estimate_cost' => 268
    },
    'front_fender' => {
        'part_num' => 41357135679, 
        'estimate_cost' => 184
    },
    'left_headlamp_assembly_without_adaptive_headlamp' => {
        'part_num' => 63117161665,
        "estimate_cost" => 727
    }
}.freeze

# Repair Estimate 2: White Oaks Collision Center in Campbell, CA 
PARTS_TWO = {
    'front_bumper_cover' => {
        'part_num' => '**QUALITY REPL PART', 
        'estimate_cost' => 275, 
        'left_front_bumper_cover_support' => {
            'part_num' => 51117058447,
            'estimate_cost' => 7
        },
        'left_front_bumper_stiffener' => {
            'part_num' => 51117134097,
            'estimate_cost' => 8
        }
    },
    'front_fender' => {
        'part_num' => "**QUALITY REPL PART", 
        'estimate_cost' => 185,
        'left_fender_front_splash_shield' => 82
    },
    'left_front_combination_lamp_assembly' => {
        'part_num' => 63117161669,
        'estimate_cost' => 1343,
        'left_headlamp_bracket' => {
            'part_num' => 51647116707,
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
    'exterior_color' => 'arctic metallic',
    'paint_code' => 'a34',   
    'vin' => 'WBAVB13556PT08288',
    'market' => 'usa',
    'type_code' => 'vb13',
    'prod_month' => '10/2005'
}.freeze


class FrontBumperCover 
    def initialize
        @oem_cost = 410
        @oem_url = 'http://www.realoem.com/bmw/enUS/showparts?id=VB13-USA-02_2004_E90_BMW_325i&diagId=51_5813#51117140859'
    
        @ebay_cost = 274 # part and paint
        @ebay_url = 'https://www.ebay.com/itm/NEW-Painted-to-Match-Front-Bumper-Cover-For-2006-2007-2008-BMW-3-Series/322253885207?hash=item4b07d40f17:g:SjsAAOSw1KxXMhIO&vxp=mtr'
    
        @local_cost = 400 # part and paint, comes with fog lights and is m3 design
        @local_link = 'https://sfbay.craigslist.org/eby/pts/d/e90-pre-lci-mtech-or-m3-front/6577227515.html'
        @local_dublin_link = 'http://www.dublin-collision.com/products---bumpers.html'
    end 
end 

class HeadLight 
    def initialize(side = 'left')
        @side = side
        @oem_cost = 940 # bi-xenon w/out adaptive headlamp
        @oem_adapt_cost = 1100 # xenon w/ adaptive headlamp
        @oem_url = 'http://www.realoem.com/bmw/enUS/showparts?id=VB13-USA-02_2004_E90_BMW_325i&diagId=63_0907#63117161665'

        # left xenon w/ adaptive headlamp, pre-owned
        @ebay_used_cost = 430 # free shipping
        @ebay_used_url = 'https://www.ebay.com/itm/06-08-BMW-E90-323i-325i-328i-330i-335i-M3-LEFT-XENON-HID-ADAPTIVE-HEADLIGHT/332540309140?fits=Year%3A2006%7CMake%3ABMW%7CModel%3A325i&hash=item4d6cf26e94:g:-DEAAOSwy~BaKJN9&vxp=mtr'

        # left xenon w/ adaptive headlamp, brand new
        @ebay_new_cost = 600 
        @ebay_new_url = 'https://www.ebay.com/itm/For-BMW-325i-328i-330i-335i-xi-Bi-Xenon-Hella-Left-Side-Headlight-Assembly/323177359364?fits=Year%3A2006%7CMake%3ABMW%7CModel%3A325i&epid=2235313231&hash=item4b3edf2804:g:gjsAAOSwUN9avOtt&vxp=mtr'


    end 
end 

class FrontSidePanel 
    def initialize(side = 'left')
        @side = side

        # additional parts needed to install
        @body_nut_count = 8
        @hexbolt_washer_count = 16
        
        @oem_cost = 334
        @oem_url = 'http://www.realoem.com/bmw/enUS/showparts?id=VB13-USA-02_2004_E90_BMW_325i&diagId=41_1596#41357135679'
        
        @ebay_cost = 70
        @ebay_url = 'https://www.ebay.com/sch/Fenders/33644/i.html?_from=R40&_nkw=41357135679+2006+BMW+325i+Base+3.0L&rt=nc&_dmd=2'
    end 
end 

class BodyNut
    def initialize
        @type = 'M6'
        @part_num = '07147133884'
        @cost = 0.36
    end 
end 

class HexBoltWithWasher
    def initialize
        @type = 'M6X12'
        @part_num = '07147147513'
        @cost = 0.38
    end 
end 