// gml_Object_lampioncino_Create_0  locals=1 args=0 len=96
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.v y
0000001C: neg.v.d
00000020: pop.v.v depth
00000028: push.imm.e 0
0000002C: conv.i.v
00000030: push.imm.e 0
00000034: conv.i.v
00000038: push.imm.e 298
0000003C: conv.i.v
00000040: call action_create_object(argc=3)
00000048: popz
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: call action_set_relative(argc=1)
0000005C: popz