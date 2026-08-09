// gml_Object_laserone_retro_Alarm_1  locals=1 args=0 len=132
// locals: arguments
00000000: push.imm.e 15
00000004: conv.i.v
00000008: push.v y
00000010: push.v x
00000018: call instance_nearest(argc=3)
00000020: conv.v.i
00000024: push.v [stacktop].y
0000002C: push.imm.e 15
00000030: conv.i.v
00000034: push.v y
0000003C: push.v x
00000044: call instance_nearest(argc=3)
0000004C: conv.v.i
00000050: push.v [stacktop].x
00000058: push.v y
00000060: push.v x
00000068: call point_direction(argc=4)
00000070: pop.v.v image_angle
00000078: push.imm.e 0
0000007C: pop.v.i ratt