// gml_Object_sold20_Mouse_10  locals=1 args=0 len=152
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.i 16744448
00000024: conv.i.v
00000028: push.imm.e 1
0000002C: conv.i.v
00000030: push.imm.e -50
00000034: conv.i.v
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 1
00000044: conv.i.v
00000048: call action_effect(argc=6)
00000050: popz
00000054: push.imm.e 156
00000058: pushenv 0x210CBE8
0000005C: push.v mon
00000064: push.imm.e 400
00000068: add.i.v
0000006C: pop.v.v mon
00000074: popenv 0x410CBD0
00000078: call action_kill_object(argc=0)
00000080: popz
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: call action_set_relative(argc=1)
00000094: popz