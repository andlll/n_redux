// gml_Object_fr_tuto1_Step_2  locals=1 args=0 len=136
// locals: arguments
00000000: push.global.v global.sca
00000008: pop.v.v image_xscale
00000010: push.global.v global.sca
00000018: pop.v.v image_yscale
00000020: push.imm.e -1
00000024: push.imm.e 0
00000028: push.v obj0.view_hview[array]
00000030: push.imm.e -1
00000034: push.imm.e 0
00000038: push.v obj0.view_yview[array]
00000040: add.v.v
00000044: push.imm.e 100
00000048: push.global.v global.sca
00000050: mul.v.i
00000054: sub.v.v
00000058: push.imm.e -1
0000005C: push.imm.e 0
00000060: push.v obj0.view_xview[array]
00000068: push.imm.e 344
0000006C: push.global.v global.sca
00000074: mul.v.i
00000078: add.v.v
0000007C: call action_move_to(argc=2)
00000084: popz