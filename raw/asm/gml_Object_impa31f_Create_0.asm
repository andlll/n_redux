// gml_Object_impa31f_Create_0  locals=2 args=0 len=396
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 455
00000018: pushenv 0x213FFB8
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x213FFB8
00000054: b 0x213FFC0
00000058: popenv 0x413FF7C
0000005C: b 0x213FFC4
00000060: popenv 0x1D3FFC0
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x213FFF4
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e 455
00000098: pushenv 0x2140038
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 1
000000A8: conv.i.v
000000AC: push.v dawn
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x2140038
000000D4: b 0x2140040
000000D8: popenv 0x413FFFC
000000DC: b 0x2140044
000000E0: popenv 0x1D40040
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x2140074
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.i 15201023
00000104: conv.i.v
00000108: call action_sprite_color(argc=2)
00000110: popz
00000114: push.v y
0000011C: neg.v.d
00000120: pop.v.v depth
00000128: push.imm.e 0
0000012C: pop.v.i demos
00000134: push.imm.e 240
00000138: push.imm.e -1
0000013C: push.imm.e 0
00000140: pop.v.i obj0.alarm[array]
00000148: push.imm.e 1
0000014C: pop.v.i phase
00000154: push.imm.e 0
00000158: conv.i.v
0000015C: push.imm.e 0
00000160: conv.i.v
00000164: push.imm.e 485
00000168: conv.i.v
0000016C: call action_create_object(argc=3)
00000174: popz
00000178: push.imm.e 0
0000017C: conv.i.v
00000180: call action_set_relative(argc=1)
00000188: popz