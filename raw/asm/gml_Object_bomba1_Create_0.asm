// gml_Object_bomba1_Create_0  locals=1 args=0 len=96
// locals: arguments
00000000: push.imm.e 8
00000004: conv.i.v
00000008: push.imm.e 280
0000000C: conv.i.v
00000010: call action_set_motion(argc=2)
00000018: popz
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 30
00000028: conv.i.v
0000002C: call action_set_alarm(argc=2)
00000034: popz
00000038: push.imm.e 0
0000003C: pop.v.i arm
00000044: push.v y
0000004C: neg.v.d
00000050: push.imm.e 400
00000054: sub.i.v
00000058: pop.v.v depth