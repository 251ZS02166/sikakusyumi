const toggleButtons = document.querySelectorAll('.toggle-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
const allToggleBtn = document.getElementById('allToggleBtn');

// 1. 個別の対策アコーディオン開閉
function setCardState(button, open) {
  const wrapper = button.nextElementSibling;
  const textSpan = button.querySelector('.btn-text');

  button.classList.toggle('is-open', open);
  wrapper.classList.toggle('is-open', open);
  button.setAttribute('aria-expanded', String(open));
  textSpan.textContent = open ? '合格対策を閉じる' : '合格対策を見る';
}

toggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const willOpen = !button.classList.contains('is-open');
    setCardState(button, willOpen);
    updateAllToggleLabel();
  });
});

// 2. 分野別の絞り込みフィルター
filterButtons.forEach((filterBtn) => {
  filterBtn.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('is-active'));
    filterBtn.classList.add('is-active');

    const targetCategory = filterBtn.dataset.filter;

    cards.forEach((card) => {
      const match = targetCategory === 'all' || card.dataset.category === targetCategory;
      card.classList.toggle('is-hidden', !match);
    });

    updateAllToggleLabel();
  });
});

// 3. 「すべて開く／すべて閉じる」一括切り替え
function updateAllToggleLabel() {
  const visibleButtons = Array.from(toggleButtons).filter(
    (btn) => !btn.closest('.card').classList.contains('is-hidden')
  );
  const allOpened =
    visibleButtons.length > 0 &&
    visibleButtons.every((btn) => btn.classList.contains('is-open'));

  allToggleBtn.textContent = allOpened ? 'すべて閉じる' : 'すべて開く';
}

allToggleBtn.addEventListener('click', () => {
  const visibleButtons = Array.from(toggleButtons).filter(
    (btn) => !btn.closest('.card').classList.contains('is-hidden')
  );
  const shouldOpenAll = !visibleButtons.every((btn) =>
    btn.classList.contains('is-open')
  );

  visibleButtons.forEach((btn) => setCardState(btn, shouldOpenAll));
  updateAllToggleLabel();
});
