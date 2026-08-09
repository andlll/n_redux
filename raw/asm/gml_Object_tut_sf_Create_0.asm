// gml_Object_tut_sf_Create_0  locals=1 args=0 len=100
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 2
00000014: conv.i.v
00000018: push.imm.e 2
0000001C: conv.i.v
00000020: call action_sprite_transform(argc=4)
00000028: popz
0000002C: push.imm.e 6
00000030: conv.i.v
00000034: push.imm.e 210
00000038: conv.i.v
0000003C: call action_set_motion(argc=2)
00000044: popz
00000048: push.imm.e 1
0000004C: conv.i.v
00000050: push.imm.e 400
00000054: conv.i.v
00000058: call action_set_alarm(argc=2)
00000060: popz