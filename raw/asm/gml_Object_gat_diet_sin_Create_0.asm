// gml_Object_gat_diet_sin_Create_0  locals=1 args=0 len=56
// locals: arguments
00000000: push.v y
00000008: neg.v.d
0000000C: push.imm.e 10
00000010: add.i.v
00000014: pop.v.v depth
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 2
00000028: conv.i.v
0000002C: call action_set_alarm(argc=2)
00000034: popz