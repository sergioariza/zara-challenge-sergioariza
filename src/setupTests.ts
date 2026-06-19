import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import './i18n'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder
