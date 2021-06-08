import requests as req


tdk_signatures = {
    'gts':        ['ara'],
    'oneri':      ['soz'],
    'yazim':      ['ara'],
    'taramaId':   ['id_var'],
    'gts_id':     ['id_var'],
    'terim':      ['eser_ad', 'ara'],
    'lehceler':   ['ara', 'lehce'],
    'bati':       ['ara'],
    'atasozu':    ['ara'],
    'derleme':    ['ara'],
    'hemsirelik': ['ara'],
    'eczacilik':  ['ara'],
    'metroloji':  ['ara'],
    'tarama':     ['ara'],
    'adlar':      ['ara'],
    'adlar2':     ['ara', 'gore', 'cins'],
    'kilavuz':    ['prm', 'ara'],
    'etms':       ['ara'],
}

tdk_urls = {
    'gts':        "https://sozluk.gov.tr/gts",
    'oneri':      "https://sozluk.gov.tr/oneri",
    'yazim':      "https://sozluk.gov.tr/yazim",
    'taramaId':   "https://sozluk.gov.tr/taramaId",
    'gts_id':     "https://sozluk.gov.tr/gts_id",
    'terim':      "https://sozluk.gov.tr/terim",
    'lehceler':   "https://sozluk.gov.tr/lehceler",
    'bati':       "https://sozluk.gov.tr/bati",
    'atasozu':    "https://sozluk.gov.tr/atasozu",
    'derleme':    "https://sozluk.gov.tr/derleme",
    'hemsirelik': "https://sozluk.gov.tr/hemsirelik",
    'eczacilik':  "https://sozluk.gov.tr/eczacilik",
    'metroloji':  "https://sozluk.gov.tr/metroloji",
    'tarama':     "https://sozluk.gov.tr/tarama",
    'adlar':      "https://sozluk.gov.tr/adlar",
    'adlar2':     "https://sozluk.gov.tr/adlar",
    'kilavuz':    "https://sozluk.gov.tr/kilavuz",
    'etms':       "https://sozluk.gov.tr/etms",
}


# TODO: Dictionary names


def error_print(msg):
    print("TDK: " + msg)


def get_request(url, params):
    r = req.get(url=url, params=params)
    return r.json()


def tdk_query(parameters):
    func = parameters.get('func')
    if func is None:
        error_print("No 'func' amoung parameters.")
        return None
    parameters = parameters.copy()
    parameters.pop('func')

    sig = tdk_signatures.get(func)
    if sig is None:
        error_print(func + "' not found in signatures.")
        return None
    if sig != list(parameters.keys()):
        error_print("Signature of '" + func + "' does not match. Got " + str(list(parameters.keys())) + ". Should be " + str(sig))
        return None

    response = get_request(tdk_urls[func], parameters)
    return response


def translate_tdk_definitions(response):
    # Uncompress property list for senses.
    for definition in response:
        if definition['anlamlarListe'][0].get('ozelliklerListe'):
            first_property_3 = list(filter(lambda p: p.get('tur') == "3", definition['anlamlarListe'][0]['ozelliklerListe']))
        else:
            first_property_3 = []
        for sense in definition['anlamlarListe']:
            if not sense.get('ozelliklerListe'):
                sense['ozelliklerListe'] = []
            prop_3 = list(filter(lambda p: p.get('tur') == "3", sense['ozelliklerListe']))
            #print(list(map(lambda p: p.get('tam_adi'), prop_3)))
            if len(prop_3) == 0:
                sense['ozelliklerListe'] += first_property_3
            #print(list(map(lambda p: p.get('tam_adi'), filter(lambda p: p.get('tur') == "3", sense['ozelliklerListe']))))
            
    return response


def query(parameters):
    tdk_response = tdk_query(parameters)
    if (not isinstance(tdk_response, list)):
        if tdk_response.get('error'):
            return None
        else:
            return None

    # For now, only supporting gts and oneri.
    if parameters['func'] == 'oneri':
        return tdk_response
    else:
        return translate_tdk_definitions(tdk_response)



def test_func(parameters):
    print("TEST " + str(parameters))
    print("")
    print(query(parameters))
    print("")

def test():
    test_func({'func': 'gts', 'ara': "araba"})
    test_func({'func': 'oneri', 'soz': "araba"})
    test_func({'func': 'yazim', 'ara': "araba"})
    test_func({'func': 'taramaId', 'id_var': "1111"})
    test_func({'func': 'gts_id', 'id_var': "1111"})
    test_func({'func': 'terim', 'eser_ad': "tümü", 'ara': "ivme"})
    test_func({'func': 'terim', 'eser_ad': "Fizik Terimleri Sözlüğü", 'ara': "ivme"})

    # TODO rest

    #test_func("adlar", adlar("can"))

if __name__ == "__main__":
    test()
