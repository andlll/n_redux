// gml_Object_lasergun_Create_0  locals=2 args=0 len=492
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i redder
00000020: push.imm.e 455
00000024: pushenv 0x20F351C
00000028: push.imm.e 0
0000002C: conv.i.v
00000030: push.imm.e 1
00000034: conv.i.v
00000038: push.v night
00000040: call action_if_variable(argc=3)
00000048: pop.v.v local.__b__
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20F351C
00000060: b 0x20F3524
00000064: popenv 0x40F34E0
00000068: b 0x20F3528
0000006C: popenv 0x1CF3524
00000070: push.local.v local.__b__
00000078: conv.v.b
0000007C: bf 0x20F3558
00000080: push.imm.e 1
00000084: conv.i.v
00000088: push.i 16366009
00000090: conv.i.v
00000094: call action_sprite_color(argc=2)
0000009C: popz
000000A0: push.imm.e 455
000000A4: pushenv 0x20F359C
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: push.imm.e 1
000000B4: conv.i.v
000000B8: push.v dawn
000000C0: call action_if_variable(argc=3)
000000C8: pop.v.v local.__b__
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x20F359C
000000E0: b 0x20F35A4
000000E4: popenv 0x40F3560
000000E8: b 0x20F35A8
000000EC: popenv 0x1CF35A4
000000F0: push.local.v local.__b__
000000F8: conv.v.b
000000FC: bf 0x20F35D8
00000100: push.imm.e 1
00000104: conv.i.v
00000108: push.i 15201023
00000110: conv.i.v
00000114: call action_sprite_color(argc=2)
0000011C: popz
00000120: push.v y
00000128: neg.v.d
0000012C: pop.v.v depth
00000134: push.imm.e 0
00000138: pop.v.i launching
00000140: push.imm.e 0
00000144: pop.v.i ovr
0000014C: push.imm.e 156
00000150: pushenv 0x20F364C
00000154: push.imm.e 1
00000158: conv.i.v
0000015C: call action_set_relative(argc=1)
00000164: popz
00000168: push.v wewe
00000170: push.imm.e 90
00000174: add.i.v
00000178: pop.v.v wewe
00000180: push.imm.e 0
00000184: conv.i.v
00000188: call action_set_relative(argc=1)
00000190: popz
00000194: popenv 0x40F360C
00000198: push.imm.e 1000
0000019C: pop.v.i life
000001A4: push.imm.e 0
000001A8: pop.v.i islas
000001B0: push.imm.e 0
000001B4: pop.v.i direttorio
000001BC: push.imm.e 5
000001C0: conv.i.v
000001C4: push.imm.e 23
000001C8: conv.i.v
000001CC: call action_set_alarm(argc=2)
000001D4: popz
000001D8: push.imm.e 0
000001DC: conv.i.v
000001E0: call action_set_relative(argc=1)
000001E8: popz