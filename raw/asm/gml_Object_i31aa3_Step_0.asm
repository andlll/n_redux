// gml_Object_i31aa3_Step_0  locals=2 args=0 len=400
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2119160
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2119160
00000040: b 0x2119168
00000044: popenv 0x4119124
00000048: b 0x211916C
0000004C: popenv 0x1D19168
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x21191E4
00000060: push.imm.e 0
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.v trans
00000078: call action_if_variable(argc=3)
00000080: pop.v.v local.__b__
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x21191E4
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: push.imm.e 1010
000000AC: conv.i.v
000000B0: call action_sprite_set(argc=3)
000000B8: popz
000000BC: push.imm.e 1
000000C0: pop.v.i trans
000000C8: push.imm.e 455
000000CC: pushenv 0x2119228
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.v night
000000E8: call action_if_variable(argc=3)
000000F0: pop.v.v local.__b__
000000F8: push.local.v local.__b__
00000100: conv.v.b
00000104: bf 0x2119228
00000108: b 0x2119230
0000010C: popenv 0x41191EC
00000110: b 0x2119234
00000114: popenv 0x1D19230
00000118: push.local.v local.__b__
00000120: conv.v.b
00000124: bf 0x21192AC
00000128: push.imm.e 0
0000012C: conv.i.v
00000130: push.imm.e 1
00000134: conv.i.v
00000138: push.v trans
00000140: call action_if_variable(argc=3)
00000148: pop.v.v local.__b__
00000150: push.local.v local.__b__
00000158: conv.v.b
0000015C: bf 0x21192AC
00000160: push.imm.e 1
00000164: conv.i.v
00000168: push.imm.e 0
0000016C: conv.i.v
00000170: push.imm.e 654
00000174: conv.i.v
00000178: call action_sprite_set(argc=3)
00000180: popz
00000184: push.imm.e 0
00000188: pop.v.i trans