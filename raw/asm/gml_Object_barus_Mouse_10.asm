// gml_Object_barus_Mouse_10  locals=1 args=0 len=152
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20B256C
0000001C: push.v oil
00000024: push.imm.e 700
00000028: add.i.v
0000002C: pop.v.v oil
00000034: popenv 0x40B2554
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.i 65280
00000048: conv.i.v
0000004C: push.imm.e 1
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 2
00000068: conv.i.v
0000006C: call action_effect(argc=6)
00000074: popz
00000078: call action_kill_object(argc=0)
00000080: popz
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: call action_set_relative(argc=1)
00000094: popz