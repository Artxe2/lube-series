import { pattern } from "hangul-lube"

let str = pattern("ㄷㅎㅁㄱ")
let regex = new RegExp("^" + str + ".*")