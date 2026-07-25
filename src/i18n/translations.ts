export type Locale = 'ko' | 'en'

/**
 * Shell UI strings. Game content strings (rules, dialog, item names, …)
 * belong in separate per-domain files merged in i18n/index.ts — see how
 * DEAD HAND split codex/dialog/gameUi translations.
 */
export const translations: Record<Locale, Record<string, string>> = {
    ko: {
        'title.name': '균형젤',
        'title.tagline': '한 번 베어, 양쪽 무게를 맞춰라',
        'title.play': '실험 시작',
        'title.ranking': '랭킹',
        'game.exit': '나가기',
        'ranking.title': '랭킹',
        'ranking.best': '최고 기록!',
        'ranking.empty': '아직 기록이 없습니다',
        'ranking.retry': '다시 베기',
        'ranking.menu': '메뉴로',
        'error.title': '오류',
        'error.leaderboard': '리더보드를 열 수 없습니다.',
    },
    en: {
        'title.name': 'COUNTERGEL',
        'title.tagline': 'One cut. Balance both halves.',
        'title.play': 'START TRIAL',
        'title.ranking': 'RANKING',
        'game.exit': 'EXIT',
        'ranking.title': 'RANKING',
        'ranking.best': 'NEW BEST!',
        'ranking.empty': 'No records yet',
        'ranking.retry': 'CUT AGAIN',
        'ranking.menu': 'MENU',
        'error.title': 'Error',
        'error.leaderboard': 'Could not open the leaderboard.',
    },
}
