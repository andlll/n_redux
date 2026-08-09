// gml_Object_ruinmonument_Create_0  locals=2 args=0 len=276
// locals: arguments, __b__
00000000: push.v y
00000008: neg.v.d
0000000C: pop.v.v depth
00000014: push.imm.e 455
00000018: pushenv 0x2137530
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x2137530
00000054: b 0x2137538
00000058: popenv 0x41374F4
0000005C: b 0x213753C
00000060: popenv 0x1D37538
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x213756C
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e 455
00000098: pushenv 0x21375B0
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 1
000000A8: conv.i.v
000000AC: push.v dawn
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x21375B0
000000D4: b 0x21375B8
000000D8: popenv 0x4137574
000000DC: b 0x21375BC
000000E0: popenv 0x1D375B8
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x21375EC
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.i 15201023
00000104: conv.i.v
00000108: call action_sprite_color(argc=2)
00000110: popz