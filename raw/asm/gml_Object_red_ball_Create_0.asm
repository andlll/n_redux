// gml_Object_red_ball_Create_0  locals=1 args=0 len=164
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.imm.e 120
00000028: conv.i.v
0000002C: call action_set_alarm(argc=2)
00000034: popz
00000038: push.imm.e 50
0000003C: conv.i.v
00000040: push.imm.e 15
00000044: conv.i.v
00000048: push.v y
00000050: push.v x
00000058: call instance_nearest(argc=3)
00000060: conv.v.i
00000064: push.v [stacktop].y
0000006C: push.imm.e 15
00000070: conv.i.v
00000074: push.v y
0000007C: push.v x
00000084: call instance_nearest(argc=3)
0000008C: conv.v.i
00000090: push.v [stacktop].x
00000098: call action_move_point(argc=3)
000000A0: popz