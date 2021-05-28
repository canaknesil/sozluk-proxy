import requests as req


signatures = {
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

urls = {
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


def query(parameters):
    func = parameters.get('func')
    if func is None:
        error_print("No 'func' amoung parameters.")
        return None
    parameters.pop('func')

    sig = signatures.get(func)
    if sig is None:
        error_print(func + "' not found in signatures.")
        return None
    if sig != list(parameters.keys()):
        error_print("Signature of '" + func + "' does not match. Got " + str(list(parameters.keys())) + ". Should be " + str(sig))
        return None

    response = get_request(urls[func], parameters)
    return response
    



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
