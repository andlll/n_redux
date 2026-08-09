// gml_Object_industria3_Alarm_2  locals=2 args=0 len=276
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20ED2B4
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.v oil
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20ED2B4
00000054: b 0x20ED2BC
00000058: popenv 0x40ED278
0000005C: b 0x20ED2C0
00000060: popenv 0x1CED2BC
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20ED318
00000074: push.imm.e 156
00000078: pushenv 0x20ED2F0
0000007C: push.v oil
00000084: push.imm.e -35
00000088: add.i.v
0000008C: pop.v.v oil
00000094: popenv 0x40ED2D8
00000098: push.imm.e 156
0000009C: pushenv 0x20ED314
000000A0: push.v ele
000000A8: push.imm.e 300
000000AC: add.i.v
000000B0: pop.v.v ele
000000B8: popenv 0x40ED2FC
000000BC: push.imm.e 0
000000C0: conv.i.v
000000C4: call action_set_relative(argc=1)
000000CC: popz
000000D0: push.imm.e 2
000000D4: conv.i.v
000000D8: push.imm.e 120
000000DC: conv.i.v
000000E0: call action_set_alarm(argc=2)
000000E8: popz
000000EC: push.imm.e 1
000000F0: conv.i.v
000000F4: call action_set_relative(argc=1)
000000FC: popz
00000100: push.imm.e 0
00000104: conv.i.v
00000108: call action_set_relative(argc=1)
00000110: popz