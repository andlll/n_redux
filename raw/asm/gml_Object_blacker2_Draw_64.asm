// gml_Object_blacker2_Draw_64  locals=1 args=0 len=136
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 5000
0000000C: conv.i.v
00000010: push.imm.e 5000
00000014: conv.i.v
00000018: push.imm.e 0
0000001C: conv.i.v
00000020: push.imm.e 0
00000024: conv.i.v
00000028: call draw_rectangle(argc=5)
00000030: popz
00000034: push.imm.e -1
00000038: conv.i.v
0000003C: push.imm.e -1
00000040: push.imm.e 0
00000044: push.v obj0.view_hview[array]
0000004C: push.imm.e 2
00000050: conv.i.d
00000054: div.d.v
00000058: push.imm.e -1
0000005C: push.imm.e 0
00000060: push.v obj0.view_wview[array]
00000068: push.imm.e 2
0000006C: conv.i.d
00000070: div.d.v
00000074: push.imm.e 5
00000078: conv.i.v
0000007C: call action_draw_sprite(argc=4)
00000084: popz