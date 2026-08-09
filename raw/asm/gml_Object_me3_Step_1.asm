// gml_Object_me3_Step_1  locals=1 args=0 len=48
// locals: arguments
00000000: call os_is_paused(argc=0)
00000008: conv.v.b
0000000C: bf 0x21ED03C
00000010: push.builtin.v os_type
00000018: push.imm.e 4
0000001C: cmp.i.v ==
00000020: bf 0x21ED03C
00000024: call game_end(argc=0)
0000002C: popz