// gml_Object_gatlinggun_Mouse_4  locals=2 args=0 len=520
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20F20D4
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 11
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: not.b.d
00000054: bf 0x20F20D4
00000058: b 0x20F20DC
0000005C: popenv 0x40F2094
00000060: b 0x20F20E0
00000064: popenv 0x1CF20DC
00000068: push.local.v local.__b__
00000070: conv.v.b
00000074: not.b.d
00000078: bf 0x20F2100
0000007C: push.imm.e 1
00000080: pop.v.i spra
00000088: push.imm.e 156
0000008C: pushenv 0x20F2144
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 11
0000009C: conv.i.v
000000A0: push.v selec
000000A8: call action_if_variable(argc=3)
000000B0: pop.v.v local.__b__
000000B8: push.local.v local.__b__
000000C0: conv.v.b
000000C4: bf 0x20F2144
000000C8: b 0x20F214C
000000CC: popenv 0x40F2108
000000D0: b 0x20F2150
000000D4: popenv 0x1CF214C
000000D8: push.local.v local.__b__
000000E0: conv.v.b
000000E4: bf 0x20F226C
000000E8: push.imm.e 156
000000EC: pushenv 0x20F21A4
000000F0: push.imm.e 4
000000F4: conv.i.v
000000F8: push.imm.e 20000
000000FC: conv.i.v
00000100: push.v mon
00000108: call action_if_variable(argc=3)
00000110: pop.v.v local.__b__
00000118: push.local.v local.__b__
00000120: conv.v.b
00000124: bf 0x20F21A4
00000128: b 0x20F21AC
0000012C: popenv 0x40F2168
00000130: b 0x20F21B0
00000134: popenv 0x1CF21AC
00000138: push.local.v local.__b__
00000140: conv.v.b
00000144: bf 0x20F226C
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: push.imm.e 0
00000154: conv.i.v
00000158: push.imm.e 127
0000015C: conv.i.v
00000160: call action_if_number(argc=3)
00000168: pop.v.v local.__b__
00000170: push.local.v local.__b__
00000178: conv.v.b
0000017C: bf 0x20F226C
00000180: push.imm.e 1
00000184: pop.v.i redder
0000018C: push.imm.e 1
00000190: conv.i.v
00000194: call action_set_relative(argc=1)
0000019C: popz
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: push.imm.e 0
000001AC: conv.i.v
000001B0: push.imm.e 127
000001B4: conv.i.v
000001B8: call action_create_object(argc=3)
000001C0: popz
000001C4: push.imm.e 0
000001C8: conv.i.v
000001CC: call action_set_relative(argc=1)
000001D4: popz
000001D8: push.imm.e 10
000001DC: conv.i.v
000001E0: push.imm.e 2
000001E4: conv.i.v
000001E8: call action_set_alarm(argc=2)
000001F0: popz
000001F4: push.imm.e 0
000001F8: conv.i.v
000001FC: call action_set_relative(argc=1)
00000204: popz