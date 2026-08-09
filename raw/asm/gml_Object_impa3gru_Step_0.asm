// gml_Object_impa3gru_Step_0  locals=2 args=0 len=208
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 125
00000018: pushenv 0x2145E30
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v play
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x2145E30
00000054: b 0x2145E38
00000058: popenv 0x4145DF4
0000005C: b 0x2145E3C
00000060: popenv 0x1D45E38
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x2145E94
00000074: push.imm.e 156
00000078: pushenv 0x2145E6C
0000007C: push.v ele
00000084: push.imm.e -5
00000088: add.i.v
0000008C: pop.v.v ele
00000094: popenv 0x4145E54
00000098: push.imm.e 156
0000009C: pushenv 0x2145E90
000000A0: push.v mon
000000A8: push.imm.e -5
000000AC: add.i.v
000000B0: pop.v.v mon
000000B8: popenv 0x4145E78
000000BC: push.imm.e 0
000000C0: conv.i.v
000000C4: call action_set_relative(argc=1)
000000CC: popz