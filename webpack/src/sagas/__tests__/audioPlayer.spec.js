import { takeEvery, put } from 'redux-saga/effects'
import AudioPlayer from 'utils/audioPlayer'
import {
  togglePlayPause,
  togglePauseResume,
  toggleMute,
  stopCurrentTrack,
  pauseCurrentTrack,
  changePosition,
  changeVolume,
  watchTogglePlay,
  watchChangePosition,
  watchChangeVolume,
  watchToggleMute,
  watchTogglePauseResume,
  watchStopCurrentTrack
} from 'sagas/audioPlayer'

describe('audioPlayer saga', () => {

  describe('togglePlayPause()', () => {
    const togglePlayMock = jest.fn()
    const params = { audioData: { id: 1 } }

    AudioPlayer.prototype.togglePlay = togglePlayMock

    it('success', () => {
      const saga = togglePlayPause(params)
      saga.next()

      expect(saga.next().value).toEqual(
        put({
          type: 'TOGGLE_PLAY_SUCCESS'
        })
      )
    })

    it('failure', () => {
      const saga = togglePlayPause(params)
      const error = new Error('Web audio api is not supported by your browser')
      saga.next()

      expect(saga.throw(error).value).toEqual(
        put({ type: 'TOGGLE_PLAY_ERROR', error })
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('togglePauseResume()', () => {
    const mockedResult = { isPlaying: true }
    const togglePlaybackStateMock = jest.fn(() => mockedResult)

    AudioPlayer.prototype.togglePlaybackState = togglePlaybackStateMock

    it('success', () => {
      const saga = togglePauseResume()
      const result = saga.next().value
      expect(togglePlaybackStateMock).toBeCalled()
      expect(result).toEqual(
        put({
          type: 'TOGGLE_PLAYBACK_STATE_SUCCESS', newPlayerState: mockedResult
        })
      )
    })

    it('failure', () => {
      const saga = togglePauseResume()
      const error = new Error('Web audio api is not supported by your browser')
      saga.next()

      expect(saga.throw(error).value).toEqual(
        put({ type: 'TOGGLE_PLAYBACK_STATE_ERROR', error })
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('toggleMute()', () => {
    const mockedResult = { mute: true }
    const toggleMuteStateMock = jest.fn(() => mockedResult)

    AudioPlayer.prototype.toggleMuteState = toggleMuteStateMock

    it('success', () => {
      const saga = toggleMute()
      const result = saga.next().value

      expect(result).toEqual(
        put({
          type: 'TOGGLE_MUTE_SUCCESS', newPlayerState: mockedResult
        })
      )
    })

    it('failure', () => {
      const saga = toggleMute()
      const error = new Error('Web audio api is not supported by your browser')
      saga.next()

      expect(saga.throw(error).value).toEqual(
        put({ type: 'TOGGLE_MUTE_ERROR', error })
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('stopCurrentTrack()', () => {
    const mockedResult = { isPlaying: false, position: 0 }
    const stopMock = jest.fn(() => mockedResult)

    AudioPlayer.prototype.stop = stopMock

    it('success', () => {
      const saga = stopCurrentTrack()
      const result = saga.next().value
      expect(stopMock).toBeCalled()
      expect(result).toEqual(
        put({
          type: 'STOP_TRACK_SUCCESS', newPlayerState: mockedResult
        })
      )
    })

    it('failure', () => {
      const saga = stopCurrentTrack()
      const error = new Error('Web audio api is not supported by your browser')
      saga.next()

      expect(saga.throw(error).value).toEqual(
        put({ type: 'STOP_TRACK_ERROR', error })
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('pauseCurrentTrack()', () => {
    const mockedResult = { isPlaying: false }
    const pauseMock = jest.fn(() => mockedResult)

    AudioPlayer.prototype.pause = pauseMock

    it('success', () => {
      const saga = pauseCurrentTrack()
      const result = saga.next().value
      expect(pauseMock).toBeCalled()
      expect(result).toEqual(
        put({
          type: 'PAUSE_TRACK_SUCCESS', newPlayerState: mockedResult
        })
      )
    })

    it('failure', () => {
      const saga = pauseCurrentTrack()
      const error = new Error('Web audio api is not supported by your browser')
      saga.next()

      expect(saga.throw(error).value).toEqual(
        put({ type: 'PAUSE_TRACK_ERROR', error })
      )

      expect(saga.next().done).toBe(true)
    })
  })

  describe('changeVolume()', () => {
    const params = { volume: 12 }

    it('success', () => {
      const audioPlayer = new AudioPlayer()
      const saga = changeVolume(params)
      const result = saga.next().value

      expect(audioPlayer.volume).toEqual(params.volume)
      expect(result).toEqual(
        put({
          type: 'CHANGE_VOLUME_SUCCESS', volume: params.volume
        })
      )
    })

    it('failure', () => {
      const error = new Error('Web audio api is not supported by your browser')
      const saga = changeVolume(params)
      saga.next()

      expect(saga.throw(error).value).toEqual(
        put({ type: 'CHANGE_VOLUME_ERROR', error })
      )
    })
  })

  describe('changePosition()', () => {
    const audioPlayer = new AudioPlayer()
    const params = { position: 12345 }
    Object.defineProperty(audioPlayer, 'currentTrack', {
      get: () => ({ position: params.position, setPosition: jest.fn(), setVolume: jest.fn() })
    })

    it('success', () => {
      const saga = changePosition(params)
      const result = saga.next().value

      expect(audioPlayer.position).toEqual(params.position)
      expect(result).toEqual(
        put({
          type: 'CHANGE_POSITION_SUCCESS', position: params.position
        })
      )
    })

    it('failure', () => {
      const error = new Error('Web audio api is not supported by your browser')
      const saga = changePosition(params)
      saga.next()

      expect(saga.throw(error).value).toEqual(
        put({ type: 'CHANGE_POSITION_ERROR', error })
      )
    })
  })

  describe('watchers', () => {
    it('togglePlay()', () => {
      const watcher = watchTogglePlay()

      expect(watcher.next().value).toEqual(
        takeEvery('TOGGLE_PLAY_REQUEST', togglePlayPause)
      )

      expect(watcher.next().done).toBe(true)
    })

    it('changePosition()', () => {
      const watcher = watchChangePosition()

      expect(watcher.next().value).toEqual(
        takeEvery('CHANGE_POSITION_REQUEST', changePosition)
      )

      expect(watcher.next().done).toBe(true)
    })

    it('changeVolume()', () => {
      const watcher = watchChangeVolume()

      expect(watcher.next().value).toEqual(
        takeEvery('CHANGE_VOLUME_REQUEST', changeVolume)
      )

      expect(watcher.next().done).toBe(true)
    })

    it('toggleMute()', () => {
      const watcher = watchToggleMute()

      expect(watcher.next().value).toEqual(
        takeEvery('TOGGLE_MUTE_REQUEST', toggleMute)
      )

      expect(watcher.next().done).toBe(true)
    })

    it('togglePauseResume()', () => {
      const watcher = watchTogglePauseResume()

      expect(watcher.next().value).toEqual(
        takeEvery('TOGGLE_PLAYBACK_STATE_REQUEST', togglePauseResume)
      )

      expect(watcher.next().done).toBe(true)
    })

    it('stopCurrentTrack()', () => {
      const watcher = watchStopCurrentTrack()

      expect(watcher.next().value).toEqual(
        takeEvery('STOP_TRACK_REQUEST', stopCurrentTrack)
      )

      expect(watcher.next().done).toBe(true)
    })
  })
})
