function reloadTwits() {
    $.getJSON('/', (twits) => {
        const twitList = $('#twits'); twitList.empty();
        for (const twit of twits) {
            twitList.append($('<li>').text(twit.message));
        }
    }).fail(() => {
        console.error(msg); setTimeout(reloadTwits, 5000);
    });
} 

function postTwit(event) {
    $.post('/', $(this).serialize(), () => {
        reloadTwits(); $(this).find('textarea[name="message"]').val('');
    }).fail(() => {
        console.error('Failed to post the twit.');
    });

    event.preventDefault();
}

$(() => {
    const twitList = $('#twits');
    if (twitList.length) reloadTwits();

    const twitForm = $('#twitForm');
    if (twitForm.length) twitForm.submit(postTwit)
});
