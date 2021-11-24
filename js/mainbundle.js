(() => {
    class e {
        constructor(e, t, s) {
            (this.scrollbarInput = e.querySelector("input")),
                (this.body = t),
                (this.wrapper = s),
                (this.width = 0),
                (this.sliderStep = 0),
                (this.scrollBarSetStep = this.scrollBarSetStep.bind(this)),
                (this.scrollBarOnInput = this.scrollBarOnInput.bind(this)),
                this.scrollBarSetStep(),
                (this.scrollbarInput.oninput = () => {
                    this.scrollBarOnInput();
                });
        }
        scrollBarSetStep() {
            (this.width = this.scrollbarInput.clientWidth), (this.sliderStep = (this.body.scrollWidth - this.wrapper.clientWidth) / 100), this.scrollBarOnInput();
        }
        scrollBarOnInput() {
            const e = Math.ceil(this.sliderStep * this.scrollbarInput.value, 10);
            this.body.style.transform = `translate(-${e}px,0px)`;
        }
    }
    const t = document.querySelector(".examples__categories"),
        s = document.querySelector(".examples__content");
    !(function (e, t) {
        t.addEventListener("pointerenter", (i) => {
            const n = i.clientX;
            e.touchStart(n), t.addEventListener("touchmove", s);
        }),
            t.addEventListener("pointerenter", (i) => {
                const n = i.clientX;
                e.touchStart(n), t.addEventListener("touchmove", s);
            }),
            (t.ontouchend = (i) => {
                e.touchEnd(), t.removeEventListener("touchmove", s);
            });
        const s = (t) => {
            t.cancelable && t.preventDefault();
            const s = t.touches[0].clientX;
            e.touchMove(s);
        };
    })(
        new (class {
            constructor(e, t) {
                (this.sliderBody = e), (this.sliderWrapper = t), (this.width = this.sliderWrapper.clientWidth), (this.startPosition = 10), (this.leftIndent = 10), (this.translate = 0), (this.position = 10), this.setSliderWidth();
            }
            setSliderWidth() {
                (this.sliderWidth = this.sliderBody.scrollWidth - this.sliderWrapper.offsetWidth), (this.width = this.sliderWrapper.clientWidth);
            }
            touchMove(e) {
                const t = e - this.leftIndent - this.startPosition + this.translate;
                t <= 0 && t >= -this.sliderWidth && ((this.position = t), (this.sliderBody.style.transform = `translate(${this.position}px,0px`));
            }
            touchStart(e) {
                (this.leftIndent = this.sliderWrapper.getBoundingClientRect().left), (this.width = this.sliderWrapper.clientWidth), (this.startPosition = e), (this.sliderWrapper.style.cursor = "grab");
            }
            touchEnd() {
                (this.translate = this.position), (this.startPosition = this.position), (this.sliderWrapper.style.cursor = "default");
            }
        })(t, s),
        t
    );
    const i = document.querySelectorAll(".category"),
        n = document.querySelector(".examples__tabs"),
        r = document.querySelector(".examples__categories");
    let o = {},
        l = 0;
    class a {
        constructor(e, t, s) {
            (this.category = s),
                (this.tab = n.querySelector(`[data-tab="${e}"]`)),
                (this.index = t),
                (this.prevBtn = this.tab.querySelector(".prev-category")),
                (this.nextBtn = this.tab.querySelector(".next-category")),
                (this.tabInfo = this.tab.querySelector(".tab__info")),
                (this.targetElement = this.tab.querySelector(".tab__picture")),
                (this.closeTab = this.closeTab.bind(this)),
                (this.openTab = this.openTab.bind(this)),
                (this.prevTab = this.prevTab.bind(this)),
                (this.nextTab = this.nextTab.bind(this));
        }
        moveTabInfo(e) {
            e ? this.tab.insertAdjacentElement("afterbegin", this.tabInfo) : this.targetElement.insertAdjacentElement("afterend", this.tabInfo);
        }
        addEventListeners() {
            null != this.prevBtn && this.prevBtn.addEventListener("click", this.prevTab), null != this.nextBtn && this.nextBtn.addEventListener("click", this.nextTab);
        }
        removeEventListeners() {
            null != this.prevBtn && this.prevBtn.removeEventListener("click", this.prevTab), null != this.nextBtn && this.nextBtn.removeEventListener("click", this.nextTab);
        }
        prevTab(e) {
            this.closeTab(), (l = this.index - 1), o[l].openTab();
        }
        nextTab(e) {
            this.closeTab(), (l = this.index + 1), o[l].openTab();
        }
        closeTab() {
          this.category.classList.remove("_active"), this.tab.classList.remove("_open"), this.removeEventListeners();
        }
        openTab() {
         this.category.classList.add("_active"), this.tab.classList.add("_open"), this.addEventListeners();
        }
    }
    for (let e = 0; e < i.length; e++) {
        const t = i[e],
            s = new a(t.dataset.tab, e, t);
        (o[e] = s),
            t.addEventListener("pointerdown", (t) => {
                event.stopPropagation(), l != e && ((l = e), c(), o[e].openTab());
            });
    }
 
    function c(){
            n.querySelector(".tab._open").classList.remove("_open"), r.querySelector(".category._active").classList.remove("_active");
    }
    function d() {
        if (window.matchMedia("(max-width: 768px)").matches) for (let e = 0; e < i.length; e++) o[e].moveTabInfo(!0);
        else for (let e = 0; e < i.length; e++) o[e].moveTabInfo(!1);
    }
    o[l].addEventListeners(), d();
    class h {
        constructor(e, t, s = 0, i = !1) {
            (this.section = e),
                (this.sliderWrapper = this.section.querySelector(".slider")),
                (this.sliderBody = this.section.querySelector(".slider__body")),
                (this.sliderItems = this.sliderBody.querySelectorAll(".slider__item")),
                (this.arrowNext = this.sliderWrapper.querySelector(".arrow-next")),
                (this.arrowPrev = this.sliderWrapper.querySelector(".arrow-prev")),
                (this.translate = 0),
                (this.stepFullWidth = i),
                (this.translateStep = t),
                this.setStep(),
                (this.shownItems = Math.floor(this.sliderBody.clientWidth / this.translateStep)),
                (this.maxValue = (this.sliderItems.length - this.shownItems) * this.translateStep * -1),
                (this.nextSlide = this.nextSlide.bind(this)),
                (this.prevSlide = this.prevSlide.bind(this)),
                this.addListeners();
        }
        setStep() {
            this.stepFullWidth && (this.translateStep = this.sliderWrapper.clientWidth);
        }
        setShownItems() {
            (this.shownItems = Math.floor(this.sliderBody.clientWidth / this.translateStep)), (this.maxValue = (this.sliderItems.length - this.shownItems) * this.translateStep * -1);
        }
        addListeners() {
            this.arrowNext.addEventListener("click", this.nextSlide), this.arrowPrev.addEventListener("click", this.prevSlide);
        }
        nextSlide() {
            this.setStep(),
                this.translate > this.maxValue &&
                    (0 == this.translate && this.arrowPrev.classList.remove("_unactive"), (this.translate -= this.translateStep), this.translateSlider(), this.translate == this.maxValue && this.arrowNext.classList.add("_unactive"));
        }
        prevSlide() {
            this.setStep(), this.translate < 0 && (this.arrowNext.classList.remove("_unactive"), (this.translate += this.translateStep), this.translateSlider(), 0 == this.translate && this.arrowPrev.classList.add("_unactive"));
        }
        translateSlider() {
            this.sliderBody.style.transform = `translate(${this.translate}px,0px)`;
        }
    }
    new h(document.querySelector(".feedbacks"), 510, 1, !0);
    let u = new Set(),
        m = new Set();
    const p = document.querySelectorAll(".selection-block-item");
    for (let t = 0; t < p.length; t++) {
        const s = p[t],
            i = new h(s, 122, 6);
        u.add(i);
        const n = s.querySelector(".slider"),
            r = s.querySelector(".slider__body"),
            o = new e(s.querySelector(".selection__scrollbar"), r, n);
        m.add(o);
    }
    const v = document.querySelectorAll(".selection-block-item__title");
    for (let e = 0; e < v.length; e++) {
        const t = v[e];
        t.addEventListener("click", (e) => {
            t.parentElement.classList.toggle("_open");
        });
    }
    const _ = document.querySelectorAll(".selection-block-item__btn");
    for (let e = 0; e < _.length; e++) _[e].addEventListener("click", q);
    let S = {},
        b = 0;
    const y = document.querySelector(".chosen__total span"),
        f = document.querySelector(".chosen-slider"),
        L = document.querySelector(".chosen-slider__body"),
        g = document.querySelector(".chosen__scrollbar");
    function q(e) {
        const t = e.target.parentElement,
            s = e.target.closest(".selection-block-item").dataset.materialcategory;
        s in S
            ? t.classList.contains("_chosen") || x(t, s)
            : ((function (e) {
                  const t = `<div data-materialCategory="${e}" class="chosen-slider__item">\n        <div class="chosen-slider__title">${e}</div>\n        <div class="chosen-slider__content">\n        </div>\n    </div>`;
                  L.insertAdjacentHTML("beforeend", t), (S[e] = new Set());
              })(s),
              x(t, s));
    }
    function w(e) {
        y.innerHTML = --b;
        const t = e.target.parentElement;
        t.classList.remove("_chosen");
        const s = e.target.closest(".chosen-slider__item").dataset.materialcategory;
        S[s].delete(t.dataset.material),
            t.parentElement.removeChild(t),
            0 == S[s].size &&
                (function (e) {
                    const t = L.querySelector(`[data-materialcategory="${e}"]`);
                    L.removeChild(t), delete S[e];
                })(s);
    }
    function x(e, t) {
        (y.innerHTML = ++b), e.classList.add("_chosen"), S[t].add(e.dataset.material);
        const s = document.querySelector(`.chosen-slider__item[data-materialcategory="${t}"]`),
            i = e.querySelector("img").outerHTML,
            n = s.querySelector(".chosen-slider__content"),
            r = `<div data-material="${e.dataset.material}" class="chosen-slider__chosen-item">\n        ${i}\n        <button class="chosen-slider__btn">\n            <svg>\n            <use xlink:href="img/icons/sprite.svg#minus"></use>\n            </svg>\n        </button>\n    </div>`;
        n.insertAdjacentHTML("beforeend", r),
            L.scrollWidth > f.clientWidth ? (g.classList.remove("_hidden"), E.scrollBarSetStep()) : g.classList.add("_hidden"),
            (function (e, t) {
                L.querySelector(`.chosen-slider__item[data-materialcategory="${t}"] [data-material="${e}"] .chosen-slider__btn`).addEventListener("click", w);
            })(e.dataset.material, t);
    }
    const E = new e(g, L, f);
    (window.onresize = (e) => {
        E.scrollBarSetStep();
        for (let e of m) e.scrollBarSetStep();
        for (let e of u) e.setShownItems();
        d(), I(), F();
    }),
        document.querySelector(".price__content");
    const B = document.querySelectorAll(".price-card");
    let k = 12,
        W = !1;
    const T = document.querySelector(".price__btn");
    function I() {
        W ||
            (window.matchMedia("(max-width: 768px)").matches
                ? ((k = 6), M())
                : window.matchMedia("(max-width: 1150px)").matches
                ? ((k = 12), M())
                : window.matchMedia("(max-width: 1300px)").matches
                ? ((k = 9), M())
                : window.matchMedia("(min-width: 1300px)").matches && ((k = 12), M()));
    }
    function M() {
        for (let e = k; e < B.length; e++) B[e].classList.add("_hidden");
        for (let e = 0; e < k; e++) B[e].classList.remove("_hidden");
    }
    T.addEventListener("click", (e) => {
        if (W) T.classList.remove("_open"), (W = !1), I();
        else {
            T.classList.add("_open"), (W = !0);
            for (let e = k; e < B.length; e++) B[e].classList.remove("_hidden");
        }
    }),
        I(),
        document.querySelector(".selection-block__items");
    const A = document.querySelectorAll(".selection-block-item");
    let $ = !1;
    const P = document.querySelector(".selection-block__btn");
    function O() {
        for (let e = 7; e < A.length; e++) A[e].classList.add("_hidden");
        for (let e = 0; e < 7; e++) A[e].classList.remove("_hidden");
    }
    P.addEventListener("click", (e) => {
        if ($) P.classList.remove("_open"), ($ = !1), O();
        else {
            P.classList.add("_open"), ($ = !0);
            for (let e = 7; e < A.length; e++) A[e].classList.remove("_hidden");
        }
    }),
        O(),
        (function () {
            const e = new IntersectionObserver(
                    (e) => {
                        e.forEach((e) => {
                            const t = e.target.dataset.ref,
                                s = document.querySelector('header li[data-ref="' + t + '"');
                            if (e.isIntersecting) {
                                const e = document.querySelector("header li._active");
                                null != e && e.classList.remove("_active"), s.classList.add("_active");
                            }
                        });
                    },
                    { threshold: 0, rootMargin: "-50px 0px -55% 0px" }
                ),
                t = document.querySelectorAll("header li[data-ref]");
            for (let s = 0; s < t.length; s++) {
                const i = t[s].dataset.ref,
                    n = document.querySelector('section[data-ref="' + i + '"');
                e.observe(n);
            }
        })(),
        (function () {
            const e = document.querySelector(".burger");
            document.querySelectorAll("li[data-ref]").forEach((t) => {
                t.addEventListener("click", function (s) {
                    s.preventDefault();
                    const i = document.querySelector("header li._active");
                    null != i && i.classList.remove("_active"), t.classList.add("_active");
                    const n = t.dataset.ref,
                        r = document.querySelector('section[data-ref="' + n + '"').getBoundingClientRect().top;
                    (topOffset = document.querySelector(".header").offsetHeight), e.classList.contains("_open") && X();
                    const o = r - topOffset;
                    window.scrollBy({ top: o, behavior: "smooth" });
                });
            });
        })();
    const j = document.querySelector(".footer__top-btn");
    "null" != j &&
        j.addEventListener("click", (e) => {
            window.scrollTo({ top: 10, behavior: "smooth" });
        });
    const H = document.querySelectorAll(".close-btn");
    for (let e = 0; e < H.length; e++) H[e].addEventListener("click", C);
    function C(e) {
        document.body.classList.remove("_block"), e.target.closest(".modal").classList.remove("_open");
    }
    document.querySelector(".feedbacks__btn").addEventListener("click", (e) => {
        document.querySelector(".feedback-form").classList.add("_open"), document.body.classList.add("_block");
    });
    const N = document.querySelector(".burger"),
        V = document.querySelector("header");
    function X() {
        V.classList.remove("_open"), N.classList.remove("_open"), document.body.classList.remove("_block");
    }
    N.addEventListener("click", (e) => {
        V.classList.toggle("_open"), N.classList.toggle("_open"), document.body.classList.toggle("_block");
    });
    const z = document.querySelector(".footer__logo");
    function D(e) {
        e ? document.querySelector(".footer__body").insertAdjacentElement("afterbegin", z) : document.querySelector(".footer__column").insertAdjacentElement("afterbegin", z);
    }
    function F() {
        window.matchMedia("(max-width: 768px)").matches ? D(!0) : D(!1);
    }
    F();
})();

