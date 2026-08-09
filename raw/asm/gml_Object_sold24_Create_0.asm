// gml_Object_sold24_Create_0  locals=2 args=0 len=160
// locals: arguments, __b__
00000000: push.imm.e 154
00000004: pushenv 0x210D184
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 3
00000014: conv.i.v
00000018: push.v level
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x210D184
00000040: b 0x210D18C
00000044: popenv 0x410D148
00000048: b 0x210D190
0000004C: popenv 0x1D0D18C
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x210D1E0
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 1313
00000074: conv.i.v
00000078: call action_sprite_set(argc=3)
00000080: popz
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 20
00000090: conv.i.v
00000094: call action_set_alarm(argc=2)
0000009C: popz