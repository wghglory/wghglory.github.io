// Insert fold/unfold and copy button
(function() {
    $('.highlight').each(function() {
        var $divTableResponsive = $(this).first('div'); //.table-responsive classname seems not loaded

        var foldHtml = '';

        if ($divTableResponsive.height() > 1000) {
            foldHtml = '<span class="toggle-code minus" style="position: absolute; border: 1px solid #0177b5; width: 14px; height: 14px; line-height: 12px; text-align: center;cursor:pointer;">-</span>';
        }

        var copyHtml = '<span class="btn-clipboard" style="position: absolute; right: 15px; background: #9fd691; font-size: 12px; padding: 4px; color: #fff; cursor: pointer; transition: .5s all;">Copy</span>';
        $(this).prepend(foldHtml + copyHtml);
    });

    //fold/unfold
    $('.toggle-code').on('click', function() {
        var $figure = $(this).nextAll('.table-responsive');
        if ($(this).hasClass('minus')) {
            $figure.css('max-height', 26);
            $(this).removeClass('minus').addClass('plus').text('+');
        } else {
            $figure.css('max-height', 1000);
            $(this).removeClass('plus').addClass('minus').text('-');
        }
    });

    //copy buttons
    var copyButtons = document.querySelectorAll('.btn-clipboard');
    for (let i = 0; i < copyButtons.length; i++) {

        copyButtons[i].onclick = function() {
            let $highlight = $(copyButtons[i]).parents('.highlight').first();
            let code = $highlight.find('.code').get(0);

            var transfer = document.getElementById('J_CopyTransfer');
            if (!transfer) {
                transfer = document.createElement('textarea');
                transfer.id = 'J_CopyTransfer';
                transfer.style.position = 'absolute';
                transfer.style.right = '16px';
                transfer.style.top = '10px';
                transfer.style.height = 0;
                transfer.style.width = 0;
                transfer.style.opacity = 0;
                transfer.style.zIndex = -1;
                $highlight.append(transfer);
            }
            transfer.value = code.innerText;
            transfer.focus();
            transfer.select();

            document.execCommand('Copy', false, null);
            $(transfer).remove();

            this.style.transform = 'scale(1.5)';
            this.style.background = '#0679bc';
            this.innerText = 'Copied';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.background = '#9fd691';
                this.innerText = 'Copy';
            }, 600);
        };
    }

})();
