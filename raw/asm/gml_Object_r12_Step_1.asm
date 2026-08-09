// gml_Object_r12_Step_1  locals=1 args=0 len=104
// locals: arguments
00000000: call os_is_paused(argc=0)
00000008: conv.v.b
0000000C: bf 0x20C77CC
00000010: push.builtin.v os_type
00000018: push.imm.e 4
0000001C: cmp.i.v ==
00000020: bf 0x20C7794
00000024: call game_end(argc=0)
0000002C: popz
00000030: push.builtin.v os_type
00000038: push.imm.e 0
0000003C: cmp.i.v ==
00000040: bf 0x20C77CC
00000044: push.imm.e 737
00000048: conv.i.v
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: call instance_create(argc=3)
00000064: popz