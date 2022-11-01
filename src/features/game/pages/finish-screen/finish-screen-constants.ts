import loseSound from 'src/assets/lose.mp3'
import winSound from 'src/assets/win.mp3'
import { PlayersAudio } from './finish-screen-interfaces'

export const AUDIO_BY_PLAYER_NAME: PlayersAudio = {
  'computer': loseSound,
  'user': winSound
}
