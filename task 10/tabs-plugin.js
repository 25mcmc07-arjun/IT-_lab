(function ($) {
   $.fn.simpleTabs = function (options) {
     const settings = $.extend({
            activeClass: "active",
            speed: 200,
            defaultTab: 0
        }, options);
       return this.each(function () {
            const $tabsContainer = $(this);
            const $tabs = $tabsContainer.find("li");
            const $contents = $(".tab-content");
            function activateTab(index, updateHash = true) {
                $tabs.removeClass(settings.activeClass);
                $contents.hide();
                const $tab = $tabs.eq(index);
                const tabId = $tab.data("tab");

                $tab.addClass(settings.activeClass);
                $("#" + tabId).fadeIn(settings.speed);

                if (updateHash) {
                    window.location.hash = tabId;
                }
            }
            $tabs.on("click", function () {
                activateTab($(this).index());
            });
            $tabs.attr("tabindex", "0");
            $tabs.on("keydown", function (e) {
                let index = $(this).index();
                if (e.key === "ArrowRight") {
                    index = (index + 1) % $tabs.length;
                    activateTab(index);
                    $tabs.eq(index).focus();
                }
                if (e.key === "ArrowLeft") {
                    index = (index - 1 + $tabs.length) % $tabs.length;
                    activateTab(index);
                    $tabs.eq(index).focus();
                }
            });
            if (window.location.hash) {
                const hash = window.location.hash.substring(1);
                const hashIndex = $tabs.filter("[data-tab='" + hash + "']").index();
                if (hashIndex >= 0) {
                    activateTab(hashIndex, false);
                    return;
                }
            }
            activateTab(settings.defaultTab, false);
        });
    };
})(jQuery);