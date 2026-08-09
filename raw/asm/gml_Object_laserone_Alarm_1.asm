// gml_Object_laserone_Alarm_1  locals=1 args=0 len=168
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1204
00000014: conv.i.v
00000018: call action_sprite_set(argc=3)
00000020: popz
00000024: push.imm.e 15
00000028: conv.i.v
0000002C: push.v y
00000034: push.v x
0000003C: call instance_nearest(argc=3)
00000044: conv.v.i
00000048: push.v [stacktop].y
00000050: push.imm.e 15
00000054: conv.i.v
00000058: push.v y
00000060: push.v x
00000068: call instance_nearest(argc=3)
00000070: conv.v.i
00000074: push.v [stacktop].x
0000007C: push.v y
00000084: push.v x
0000008C: call point_direction(argc=4)
00000094: pop.v.v image_angle
0000009C: push.imm.e 0
000000A0: pop.v.i ratt