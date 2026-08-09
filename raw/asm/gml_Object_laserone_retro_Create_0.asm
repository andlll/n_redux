// gml_Object_laserone_retro_Create_0  locals=1 args=0 len=256
// locals: arguments
00000000: push.v y
00000008: neg.v.d
0000000C: push.imm.e 3000
00000010: sub.i.v
00000014: pop.v.v depth
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 30
00000028: conv.i.v
0000002C: call action_set_alarm(argc=2)
00000034: popz
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 2
0000004C: conv.i.v
00000050: push.imm.e 2
00000054: conv.i.v
00000058: call action_sprite_transform(argc=4)
00000060: popz
00000064: push.imm.e 15
00000068: conv.i.v
0000006C: push.v y
00000074: push.v x
0000007C: call instance_nearest(argc=3)
00000084: conv.v.i
00000088: push.v [stacktop].y
00000090: push.imm.e 15
00000094: conv.i.v
00000098: push.v y
000000A0: push.v x
000000A8: call instance_nearest(argc=3)
000000B0: conv.v.i
000000B4: push.v [stacktop].x
000000BC: push.v y
000000C4: push.v x
000000CC: call point_direction(argc=4)
000000D4: pop.v.v image_angle
000000DC: push.imm.e 0
000000E0: pop.v.i dat
000000E8: push.imm.e 1
000000EC: pop.v.i ratt
000000F4: push.imm.e 1
000000F8: pop.v.i nocivo