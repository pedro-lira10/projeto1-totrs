'use strict';

if (!location.href.includes('operabrowserjs=no')) {
    (function(document) {
        const { href, pathname, hostname } = location;

        /*
          We make references to the following functions to not get version that
          users
          have overwritten.
        */
        const setTimeout = window.setTimeout;
        const call = Function.prototype.call;
        const copyMethod = (method, ...defaultArgs) => {
            method.call = call;
            return (...args) => {
                if (defaultArgs.length) {
                    args = defaultArgs.concat(args);
                }
                return method.call(...args);
            };
        };

        const addEventListener = copyMethod(Window.prototype.addEventListener);
        const appendChild = copyMethod(Node.prototype.appendChild);
        const createElement = copyMethod(Document.prototype.createElement);
        const createTextNode =
            copyMethod(Document.prototype.createTextNode, document);
        const setAttribute = copyMethod(Element.prototype.setAttribute);
        const querySelector = copyMethod(Document.prototype.querySelector);

        const version = () => {
            const total = Object.keys(PATCHES).length;
            /* eslint-disable max-len */
            return `Opera Desktop November 15, 2022. Active patches: ${total}`;
            /* eslint-enable max-len */
        };

        const isPartOfDomain = host =>
            hostname.endsWith(`.${host}`) || hostname === host;
        const hideOperaObject = () => {
            window.opr = "undefined";
        };
        const hideOperaUserAgent = () => {
            const newUA = navigator.userAgent.replace(/ ?OPR.[0-9.]*.*/, '');
            Object.defineProperty(window.navigator, 'userAgent', { get: () => newUA });
        };
        const hideServiceWorker = () => {
            delete Navigator.prototype.serviceWorker;
        };
        const browserjsUrl = new URL('chrome://browserjs');

        const addCssToDocument = (cssText, doc = document, mediaType = '') => {
            addCssToDocument.styleObj = addCssToDocument.styleObj || {};
            let styles = addCssToDocument.styleObj[mediaType];
            if (!styles) {
                const head = querySelector(doc, 'head');
                if (!head) {
                    // head always present in html5-parsers, assume document not ready
                    addEventListener(doc, 'DOMContentLoaded', () => {
                        addCssToDocument(cssText, doc, mediaType);
                    }, false);
                    return;
                }
                styles = createElement(doc, 'style');
                addCssToDocument.styleObj[mediaType] = styles;
                setAttribute(styles, 'type', 'text/css');
                if (mediaType) {
                    setAttribute(styles, 'media', mediaType);
                }
                appendChild(styles, createTextNode(' '));
                appendChild(head, styles);
            }
            styles.firstChild.nodeValue += `${cssText}\n`;
            return true;
        };

        const PATCHES = {
            'PATCH-1190': {
                description: 'Delta.com shows browser warning to Opera 25',
                isMatching: () => isPartOfDomain('delta.com'),
                apply: () => {
                    let value;
                    Object.defineProperty(window, 'UnsupportedBrowser', {
                        get: () => value,
                        set: arg => {
                            arg.badBrowser = () => false;
                            value = arg;
                        },
                    });
                },
            },
            'PATCH-1220': {
                description: 'To not force plugin download.',
                isMatching: () => hostname.includes('.google.') &&
                    hostname.startsWith('talkgadget'),
                apply: () => hideOperaUserAgent(),
            },
            'PATCH-1228': {
                description: 'Block for delta-homes com spam site',
                isMatching: () => isPartOfDomain('delta-homes.com'),
                apply: () => location.replace('https://google.com'),
            },
            'PATCH-1252': {
                description: 'Hide first-run overlay on read.amazon.com',
                isMatching: () => isPartOfDomain('read.amazon.com'),
                apply: () => {
                    addCssToDocument([
                        '.ui-dialog.firstRunDialog, ',
                        '.ui-dialog.firstRunDialog + .ui-widget-overlay ',
                        '{visibility:hidden}',
                    ].join(''));
                },
            },
            'PATCH-1263': {
                description: 'Hide Unsupported Browser dialog on clarks.co.uk',
                isMatching: () => isPartOfDomain('clarks.co.uk'),
                apply: () => {
                    addCssToDocument('#unsupportedBrowser {visibility:hidden}');
                },
            },
            'PATCH-1269': {
                description: 'Hide popup with ads.',
                isMatching: () => hostname.startsWith('images.google.') ||
                    hostname.startsWith('www.google.'),
                applyOnDOMReady: true,
                apply: () => {
                    const href =
                        'https://www.google.com/url?q=/chrome/browser/desktop/';
                    const res = document.evaluate(
                        `//a[contains(@href, "${href}")]`, document, null,
                        XPathResult.ANY_TYPE, null);
                    const downloadLink = res.iterateNext();
                    if (downloadLink) {
                        const ad = downloadLink.closest('div[role="dialog"]');
                        if (ad) {
                            ad.style.display = 'none';
                        }
                    }
                },
            },
            'PATCH-1277': {
                description: 'Popup with ads.',
                isMatching: () => isPartOfDomain('otvet.mail.ru'),
                apply: () => {
                    addCssToDocument('#tb-39754319 {visibility:hidden}');
                    addCssToDocument('#tb-54288097 {visibility:hidden}');
                    addCssToDocument('#tb-54288098 {visibility:hidden}');
                    addCssToDocument('#tb-54288094 {visibility:hidden}');
                    addCssToDocument('#tb-54288099 {visibility:hidden}');
                    addCssToDocument('#tb-54288095 {visibility:hidden}');
                    addCssToDocument('#tb-54288093 {visibility:hidden}');
                    addCssToDocument('#tb-32116366 {visibility:hidden}');
                },
            },
            'DNA-69435': {
                description: 'Popup with ads in search results.',
                isMatching: () => hostname.startsWith('yandex') &&
                    pathname.startsWith('/search/'),
                apply: () => {
                    addCssToDocument('.popup2.distr-popup {visibility: hidden;}');
                },
            },
            'DNA-69613': {
                description: 'Unsupporting text block.',
                isMatching: () => isPartOfDomain('tickets.oebb.at'),
                apply: () => {
                    addCssToDocument('#settingErr {visibility:hidden}');
                },
            },
            'DNA-72852': {
                description: 'Fix music playing.',
                isMatching: () => isPartOfDomain(
                    'streamdb3web.securenetsystems.net/cirrusencore/DEMOSTN'),
                apply: () => hideOperaUserAgent(),
            },
            'DNA-85788': {
                description: 'Text block with ads.',
                isMatching: () => isPartOfDomain('russian.rt.com'),
                apply: () => {
                    addCssToDocument('div#offers.offers {visibility:hidden}');
                }
            },
            'DNA-84005': {
                description: 'Unsupported message.',
                isMatching: () => isPartOfDomain('comba-telecom.com'),
                apply: () => {
                    hideOperaObject();
                    hideOperaUserAgent();
                },
            },
            'DNA-79464': {
                description: 'Unsupported message when play video.',
                isMatching: () => isPartOfDomain('cbs.com'),
                apply: () => {
                    hideOperaObject();
                    hideOperaUserAgent();
                },
            },
            'DNA-85812': {
                description: 'Unsupported text block in header.',
                isMatching: () => isPartOfDomain('vk.com'),
                apply: () => {
                    addCssToDocument('div#system_msg.fixed {visibility:hidden}');
                }
            },
            'DNA-83244': {
                description: 'Ads block in header.',
                isMatching: () => isPartOfDomain('mail.com'),
                apply: () => {
                    addCssToDocument('div.mod.mod-topper.promo {visibility:hidden}');
                },
            },
            'DNA-85510': {
                description: 'Unsupported page on entarance.',
                isMatching: () => isPartOfDomain('famemma.tv'),
                apply: () => {
                    hideOperaObject();
                    hideOperaUserAgent();
                },
            },
            'DNA-97626': {
                description: 'Fix video playing.',
                isMatching: () => isPartOfDomain('highlive.tv'),
                apply: () => {
                    hideOperaObject();
                    hideOperaUserAgent();
                },
            },
            'DNA-90739': {
                description: 'Help to get form information for Opera users',
                isMatching: () => isPartOfDomain('opera.atlassian.net') &&
                    (pathname.startsWith('/servicedesk/customer/portal/9') ||
                    pathname.startsWith('/servicedesk/customer/portal/18') ||
                    pathname.startsWith('/servicedesk/customer/portal/20')),
                applyOnDOMReady: true,
                apply: async() => {
                    const findElement = selector => new Promise(resolve => {
                        setTimeout(() => resolve(querySelector(document, selector)), 100);
                    });
                    const waitForElement = async selector => {
                        for (let i = 0; i < 50; i++) {
                            const element = await findElement(selector);
                            if (element) {
                                return element;
                            }
                        }
                        return null;
                    };
                    const setInputValue = (input, value) => {
                        const descriptor = Object.getOwnPropertyDescriptor(input, 'value');
                        let event = document.createEvent('UIEvents');
                        event.initEvent('focus', false, false);
                        input.dispatchEvent(event);
                        input.value = value + '!';
                        var desc = Object.getOwnPropertyDescriptor(input, 'value');
                        if (desc && desc.configurable) {
                            delete input.value;
                        }
                        input.value = value;
                        event = document.createEvent('HTMLEvents');
                        event.initEvent('propertychange', false, false);
                        event.propertyName = 'value';
                        input.dispatchEvent(event);
                        event = document.createEvent('HTMLEvents');
                        event.initEvent('input', true, false);
                        input.dispatchEvent(event);
                        if (descriptor) {
                            Object.defineProperty(input, 'value', descriptor);
                        }
                    };

                    const insertValueToInput = async(selector, value) => {
                        const inputElement = await waitForElement(selector);
                        if (inputElement) {
                            setTimeout(() => setInputValue(inputElement, value), 500);
                        }
                    };

                    const getGpuInformation = () => {
                        const gl = document.createElement('canvas').getContext('webgl');
                        if (!gl) {
                          return '';
                        }
                        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                        if (debugInfo) {
                          return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                        }
                        return '';
                    };

                    const insertSystemInformation = () => {
                        insertValueToInput(
                            '#customfield_10072',
                            `${navigator.userAgent} (${navigator.language}), ${getGpuInformation()}`);
                    };

                    if (pathname.includes(
                            'servicedesk/customer/portal/9/group/11/create/') ||
                            pathname.includes(
                                'servicedesk/customer/portal/18/group/32/create/')) {
                        insertSystemInformation();
                    }

                    const originalPushState = history.pushState;
                    history.pushState = function(...args) {
                        insertSystemInformation();
                        originalPushState.apply(history, args);
                    };
                },
            },
            'DNA-90251': {
                description: 'Customize button for add extensions.',
                isMatching: () => isPartOfDomain('chrome.google.com') &&
                    pathname.startsWith('/webstore/'),
                apply: () => {
                    const targetNode = document.documentElement;
                    const config = { attributes: true, childList: true, subtree: true };
                    const callback = function(mutationsList, observer) {
                        for (const mutation of mutationsList) {
                            if (mutation.type === 'childList') {
                                var webstoreButtons =
                                    document.querySelectorAll('.webstore-test-button-label');
                                for (let webstoreButton of webstoreButtons) {
                                    if (webstoreButton.innerHTML.includes('Chrome')) {
                                        webstoreButton.innerHTML =
                                            webstoreButton.innerHTML.replace('Chrome', 'Opera');
                                    }
                                }
                            }
                        }
                    };
                    const observer = new MutationObserver(callback);
                    observer.observe(targetNode, config);
                },
                applyOnDOMReady: true,
            },
            'DNA-99267': {
                description: 'Pretend to be Chrome on radio-south-africa.co.za',
                isMatching: () => isPartOfDomain('radio-south-africa.co.za'),
                apply: () => {
                    hideOperaObject();
                    hideOperaUserAgent();
                },
            },
            'DNA-99293': {
                description: 'Change game button.',
                isMatching: () =>
                      isPartOfDomain('xsolla.com') &&
                      pathname.startsWith('/paystation3/'),
                applyOnDOMReady: true,
                apply: async() => {
                    const probeCondition = async (conditionFunction) => {
                        const sleep = (millis) => new Promise((resolve) =>
                              setTimeout(resolve), millis);
                        for (let i = 0; i < 100; i++) {
                          if (conditionFunction()) {
                            return true;
                          }
                          await sleep(50);
                        }
                        return false;
                      };
                    const findEULA = () => document.querySelector("a[href" +
                    "='https://www.opera.com/terms']");
                    const eula = await probeCondition(findEULA);
                    const targetNode = document.documentElement;
                    const config = {attributes: true,
                                    childList: true,
                                    subtree: true};
                    const callback = function(mutationsList, observer) {
                        for (const mutation of mutationsList) {
                            if (mutation.type === 'childList') {
                                var backButtons =
                                    document.querySelectorAll('.btn.' +
                                    'btn-flat.btn-md.btn-accent.tab-focus');
                                for (let backButton of backButtons) {
                                    if (backButton.innerHTML.includes('to' +
                                            ' the game')) {
                                        backButton.innerHTML =
                                          backButton.innerHTML.replace('to' +
                                            ' the game', '');
                                        addCssToDocument('svg {visibility: hidden;}');
                                    }
                                }
                            }
                        }
                    };
                    setTimeout(() => {
                        const button =
                          document.querySelector('.btn.btn-flat.btn-md.'+
                                                 'btn-accent.tab-focus');
                        if (button) {
                        button.click();
                                    }
                                      }, 6000);
                    const observer = new MutationObserver(callback);
                    observer.observe(targetNode, config);
                },
            },
            'DNA-99524': {
                description: 'Browser.js version reported on browserjs page.',
                isMatching: () => href === browserjsUrl.href,
                applyOnDOMReady: true,
                apply: () => {
                    const browserjs_info = version();
                    const addVersion =
                      createTextNode(`Today ${browserjs_info}`);
                    document.body.appendChild(addVersion);
                },
            },
            'DNA-102161': {
                description: 'Fix live stream video.',
                isMatching: () => isPartOfDomain('twitch.tv'),
                apply: () => {
                    hideOperaObject();
                    hideOperaUserAgent();
                    hideServiceWorker();
                },
            },
        };

        for (let key in PATCHES) {
            const {isMatching, apply,
                   applyOnDOMReady} = PATCHES[key];
            if (isMatching()) {
                const run = () => {
                    apply();
                };

                if (applyOnDOMReady) {
                    addEventListener(document, 'DOMContentLoaded', run, false);
                } else {
                    run();
                }
            }
        }
    })(document);
}

'use strict';

const elementClickString = '+element-click(';
const sitekey_tag = 'data-adblockkey';

class FilterContent {
  constructor() {
    this.filteredElements_ = new WeakSet();
    this.observer_ = null;
    this.root_ = null;
    this.selectors_ = new Map();
    this.styles_ = document.createElement('style');
    this.styles_.type = 'text/css';
    this.urls_ = new Map();
    this.elementsToClick_ = new Array();
    this.sitekey_ =
        document.getElementsByTagName('html')[0].getAttribute(sitekey_tag);
    if (this.sitekey_ === null) {
      this.sitekey_ = '';
    }

    opr.contentFilterPrivate.isWhitelisted(whitelisted => {
      if (!whitelisted) {
        this.whenDomReady_().then(() => this.initialize_());
        this.applySelectors_();
      }
    });
  }

  applySelectors_() {
    return new Promise(resolve => {
      opr.contentFilterPrivate.getBlockedSelectors(selectors => {
        if (!Array.isArray(selectors)) {
          resolve();
          return;
        }
        selectors.forEach(element => this.getElementClickSelectors_(element));
        let styles = [];
        while (selectors.length) {
          styles.push(`:root ${selectors.splice(0, 1000).join(', :root ')}`);
        }

        this.styles_.textContent =
            styles.map(selector => `${selector} { display: none !important; }`)
                .join('\n');
        resolve();
      });
    });
  }

  fetchSelectors_(element) {
    let selectors = [];
    if (element.id) {
      selectors.push(`#${element.id}`);
    }

    if (element.classList) {
      for (let cl of element.classList) {
        selectors.push(`.${cl}`);
      }
    }

    return selectors;
  }

  filter_() {
    if (!this.root_) {
      return;
    }

    this.filterChildrenIfNeeded_(this.root_);
    this.filterAssetsIfNeeded_(this.root_);
    this.clickElementsIfNeeded_();
  }

  filterAssetsIfNeeded_(root) {
    let assets = root.querySelectorAll('[src]');
    for (let asset of assets) {
      if (this.isUrlFiltered_(asset)) {
        this.hideElement_(asset);
      }
    }
  }

  filterChildrenIfNeeded_(parent) {
    if (parent.querySelectorAll) {
      let children = parent.querySelectorAll('[id], [class]');
      for (let i = 0; i < children.length; i++) {
        this.filterElementIfNeeded_(children[i]);
      }
    }
  }

  filterElementIfNeeded_(element) {
    if (!element) {
      return false;
    }

    if (this.filteredElements_.has(element)) {
      return true;
    }

    if (this.hasForbidenSelectors_(element)) {
      this.hideElement_(element);
      if (element.id) {
        opr.contentFilterPrivate.recordBlockAction(element.id);
      }
      return true;
    }

    return false;
  }

  hasForbidenSelectors_(element, callback) {
    const selectors = this.fetchSelectors_(element);
    const newSelectors = [];
    let selector;
    let value;

    for (let i = 0; i < selectors.length; i++) {
      selector = selectors[i];
      value = this.selectors_.get(selector);
      if (value) {
        return true;
      }

      if (value === undefined) {
        newSelectors.push(selector);
      }
    }

    for (let i = 0; i < newSelectors.length; i++) {
      selector = newSelectors[i];
      value =
          opr.contentFilterPrivate.isElementBlocked(selector, this.sitekey_);
      this.selectors_.set(selector, value);
      if (value) {
        return true;
      }
    }
  }

  hideElement_(element) {
    if (!element) {
      return;
    }

    if (element.style && element.style.getPropertyValue('display') !== 'none') {
      element.style.setProperty('display', 'none', 'important');
    }
    this.filteredElements_.add(element);
  }

  initialize_() {
    opr.contentFilterPrivate.onRulesAvailableInRenderer.addListener(
        (id) => this.onRulesAvailableInRenderer_(id));

    this.root_ = document.body;
    document.head.appendChild(this.styles_);
    this.observer_ = new MutationObserver(
        mutations => setTimeout(() => this.onDocumentChange_(mutations), 0));
    this.observer_.observe(this.root_, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class', 'id'],  // 'style'
      childList: true,
      subtree: true,
    });

    this.root_.addEventListener(
        'error', e => this.onResourceError_(e.target), true);
    opr.contentFilterPrivate.onRulesLoaded.addListener(
        () => this.onRulesLoaded_());

    this.filter_();
  }

  getElementType(tagName) {
    if (tagName === 'IMG') {
      return opr.contentFilterPrivate.ElementType.IMAGE;
    }
    if (tagName === 'IFRAME') {
      return opr.contentFilterPrivate.ElementType.SUB_FRAME;
    }
    return opr.contentFilterPrivate.ElementType.UNKNOWN;
  }

  isUrlFiltered_(element) {
    if (!element || !element.src) {
      return false;
    }
    const url = element.src;
    const element_type = this.getElementType(element.tagName);
    let isBlocked = this.urls_.get(url);
    if (isBlocked === undefined) {
      isBlocked = opr.contentFilterPrivate.isURLBlocked(
          url, element_type, this.sitekey_);
      this.urls_.set(url, isBlocked);
    }

    return isBlocked;
  }

  onDocumentChange_(mutations) {
    for (let record of mutations) {
      let addedNodes = record.addedNodes;
      if (addedNodes) {
        for (let i = 0; i < addedNodes.length; i++) {
          if (!this.filterElementIfNeeded_(addedNodes[i])) {
            this.filterChildrenIfNeeded_(addedNodes[i]);
          }
        }
      }

      if (record.target) {
        this.filterElementIfNeeded_(record.target);
      }
    }
    this.clickElementsIfNeeded_();
  }

  onResourceError_(element) {
    if (this.isUrlFiltered_(element)) {
      this.hideElement_(element);
    }
  }

  onRulesAvailableInRenderer_(id) {
    if (opr.contentFilterPrivate.matchRulesAvailableEventID(location.href, id))
      this.onRulesLoaded_();
  }

  onRulesLoaded_() {
    this.filteredElements_ = new WeakSet();
    this.selectors_ = new Map();
    this.urls_ = new Map();
    this.applySelectors_().then(() => this.filter_());
  }

  whenDomReady_() {
    return new Promise(resolve => {
      if (document.readyState !== 'loading') {
        resolve();
      } else {
        document.addEventListener('DOMContentLoaded', () => resolve());
      }
    });
  }

  getElementClickSelectors_(element) {
    let tempElement = element;
    if (tempElement.startsWith(elementClickString)) {
      tempElement = tempElement.slice(elementClickString.length);
      if (tempElement.endsWith(')')) {
        tempElement = tempElement.slice(0, -1);
      }
      this.elementsToClick_.push(tempElement);
    }
  }

  async isContentFilterAdsEnabled_() {
    return new Promise(resolve => {
      opr.contentFilterPrivate.isContentFilterTypeEnabled(
          opr.contentFilterPrivate.ContentFilterType.ADS,
          isBlockingAdsEnabled => {
            resolve(isBlockingAdsEnabled);
          });
    });
  }

  async clickElementsIfNeeded_() {
    if (!await this.isContentFilterAdsEnabled_()) {
      return;
    }
    for (const element of this.elementsToClick_) {
      const skipButton = document.querySelector(element);
      if (skipButton) {
        skipButton.click();
      }
    }
  }
}

new FilterContent();

<div class="wpcf7-response-output" aria-hidden="true">Um ou mais campos possuem um erro. Verifique e tente novamente.</div>