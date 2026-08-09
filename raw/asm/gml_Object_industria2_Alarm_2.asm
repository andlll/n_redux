// gml_Object_industria2_Alarm_2  locals=2 args=0 len=300
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20EC114
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.v oil
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20EC114
00000054: b 0x20EC11C
00000058: popenv 0x40EC0D8
0000005C: b 0x20EC120
00000060: popenv 0x1CEC11C
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20EC190
00000074: push.imm.e 156
00000078: pushenv 0x20EC150
0000007C: push.v oil
00000084: push.imm.e -20
00000088: add.i.v
0000008C: pop.v.v oil
00000094: popenv 0x40EC138
00000098: push.imm.e 156
0000009C: pushenv 0x20EC174
000000A0: push.v ele
000000A8: push.imm.e 120
000000AC: add.i.v
000000B0: pop.v.v ele
000000B8: popenv 0x40EC15C
000000BC: push.v makee
000000C4: push.imm.e 1
000000C8: add.i.v
000000CC: pop.v.v makee
000000D4: push.imm.e 0
000000D8: conv.i.v
000000DC: call action_set_relative(argc=1)
000000E4: popz
000000E8: push.imm.e 2
000000EC: conv.i.v
000000F0: push.imm.e 120
000000F4: conv.i.v
000000F8: call action_set_alarm(argc=2)
00000100: popz
00000104: push.imm.e 1
00000108: conv.i.v
0000010C: call action_set_relative(argc=1)
00000114: popz
00000118: push.imm.e 0
0000011C: conv.i.v
00000120: call action_set_relative(argc=1)
00000128: popz