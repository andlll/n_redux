// gml_Object_industria3_Alarm_3  locals=2 args=0 len=296
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 3
00000018: conv.i.v
0000001C: push.imm.e 20
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 156
00000034: pushenv 0x20ED1A8
00000038: push.imm.e 2
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.v oil
00000050: call action_if_variable(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x20ED1A8
00000070: b 0x20ED1B0
00000074: popenv 0x40ED16C
00000078: b 0x20ED1B4
0000007C: popenv 0x1CED1B0
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20ED248
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: push.v deming
000000A8: call action_if_variable(argc=3)
000000B0: pop.v.v local.__b__
000000B8: push.local.v local.__b__
000000C0: conv.v.b
000000C4: bf 0x20ED248
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: call action_set_relative(argc=1)
000000D8: popz
000000DC: push.imm.e -181
000000E0: conv.i.v
000000E4: push.imm.e 7
000000E8: conv.i.v
000000EC: push.imm.e 707
000000F0: conv.i.v
000000F4: call action_create_object(argc=3)
000000FC: popz
00000100: push.imm.e 0
00000104: conv.i.v
00000108: call action_set_relative(argc=1)
00000110: popz
00000114: push.imm.e 0
00000118: conv.i.v
0000011C: call action_set_relative(argc=1)
00000124: popz