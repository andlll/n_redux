// gml_Object_mudr31_Create_0  locals=2 args=0 len=332
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 455
00000018: pushenv 0x20CDF4C
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20CDF4C
00000054: b 0x20CDF54
00000058: popenv 0x40CDF10
0000005C: b 0x20CDF58
00000060: popenv 0x1CCDF54
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20CDF88
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e 455
00000098: pushenv 0x20CDFCC
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 1
000000A8: conv.i.v
000000AC: push.v dawn
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x20CDFCC
000000D4: b 0x20CDFD4
000000D8: popenv 0x40CDF90
000000DC: b 0x20CDFD8
000000E0: popenv 0x1CCDFD4
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x20CE008
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.i 15201023
00000104: conv.i.v
00000108: call action_sprite_color(argc=2)
00000110: popz
00000114: push.imm.e 0
00000118: conv.i.v
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 183
00000128: conv.i.v
0000012C: call action_create_object(argc=3)
00000134: popz
00000138: push.imm.e 0
0000013C: conv.i.v
00000140: call action_set_relative(argc=1)
00000148: popz