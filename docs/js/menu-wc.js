'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ecommerce documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-208cbb4848d7471748a349dd339b755f7e0c930c16b78042b3a6062f8ee8cdd2622fcfebe571724bcb51664d33e917dde1d2ac0125862df1fea8e33c8ede1f08"' : 'data-bs-target="#xs-components-links-module-AppModule-208cbb4848d7471748a349dd339b755f7e0c930c16b78042b3a6062f8ee8cdd2622fcfebe571724bcb51664d33e917dde1d2ac0125862df1fea8e33c8ede1f08"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-208cbb4848d7471748a349dd339b755f7e0c930c16b78042b3a6062f8ee8cdd2622fcfebe571724bcb51664d33e917dde1d2ac0125862df1fea8e33c8ede1f08"' :
                                            'id="xs-components-links-module-AppModule-208cbb4848d7471748a349dd339b755f7e0c930c16b78042b3a6062f8ee8cdd2622fcfebe571724bcb51664d33e917dde1d2ac0125862df1fea8e33c8ede1f08"' }>
                                            <li class="link">
                                                <a href="components/AdminDashboard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminDashboard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/App.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >App</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Blog.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Blog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Cart.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Cart</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Checkout.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Checkout</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Contactus.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Contactus</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Dashboard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Dashboard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Footer.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Footer</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Home.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Home</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Login.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Login</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavAuth.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavAuth</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavBlank.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavBlank</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Notfound.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Notfound</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Products.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Products</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Singleproduct.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Singleproduct</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/register.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >register</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/serve.html" data-type="entity-link" >serve</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BlogPost.html" data-type="entity-link" >BlogPost</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});