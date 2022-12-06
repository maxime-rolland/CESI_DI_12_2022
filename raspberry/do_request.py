# Make GET request
import urequests

def do_request(url):
    r = urequests.get(url)
    result=r.json()
    r.close()
    return result
