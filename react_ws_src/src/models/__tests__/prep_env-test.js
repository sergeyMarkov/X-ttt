jest.unmock('../prep_env');
jest.unmock('ampersand-app'); 
import app from 'ampersand-app'

app.settings = {
		ws_conf: null,
	}

app.settings.ws_conf = 
{  
        "site": {
            "vals": {
                "year": "2016",
                "author": "kisla interactive"
            }
        },
        "conf": {
            "ga_acc": {
                "an": "UA-379313-16"
            }
        },
        "loc": {
            "_SCRIPT_ROOT": {
                "u": "http://z2/projs/kisla/X-react-starter/dev/WS/"
            },
            "SCRIPT_ROOT": {
                "u": "http://X-react-starter.kisla.com/"
            },
            "SCRIPT__contact_form": {
                "u": "e/s"
            }
        },
        "main_menu": {
            "pages": {
                "p": [
                    {
                        "name": "User",
                        "u": "user",
                        "ico": "fa fa-user"
                    },
                    {
                        "name": "Page",
                        "u": "pg/txtpg",
                        "ico": "fa fa-file-text"
                    }
                ]
            }
        },
        "header": {
            "head_l_logo": {
                "i": "images/react_sha.png",
                "u": "/"
            },
            "site_title": {
                "txt": "X react starter pack",
                "u": "/"
            }
        },
        "footer": {
            "items": {
                "i": [
                    {
                        "tp": "txt",
                        "txt": "Copyright © 2016 kisla interactive"
                    },
                    {
                        "tp": "ln",
                        "txt": "terms and conditions",
                        "u": "pupg/terms-and-conditions"
                    },
                    {
                        "tp": "ln",
                        "txt": "privacy",
                        "u": "pupg/privacy-policy"
                    },
                    {
                        "tp": "ln",
                        "txt": "contact us",
                        "u": "contact-us"
                    }
                ]
            },
            "foot_msg": {
                "txt": "This is a minimal React.js pack combined from different sources."
            },
            "foot_r_logo": {
                "i": "images/k_logo.png",
                "u": "http://www.kisla.com",
                "t": "blank"
            }
        }
}



describe('prep_env', () => {
	it('loaded from xml year', () => {
		// const disc_model = require('../disc_model');
		expect(app.settings.ws_conf.site.vals.year).toBe("2016");
	});

});
