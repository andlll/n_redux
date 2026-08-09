// gml_Object_iconic_Alarm_1  locals=1 args=0 len=160
// locals: arguments
00000000: push.imm.e 1
00000004: pop.v.i over
0000000C: push.imm.e 156
00000010: pushenv 0x21EB378
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 665
00000028: conv.i.v
0000002C: call action_sprite_set(argc=3)
00000034: popz
00000038: popenv 0x41EB354
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.imm.e 0
00000048: conv.i.v
0000004C: push.imm.e 717
00000050: conv.i.v
00000054: call action_create_object(argc=3)
0000005C: popz
00000060: push.imm.e 0
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 714
00000074: conv.i.v
00000078: call action_create_object(argc=3)
00000080: popz
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 100
00000090: conv.i.v
00000094: call action_set_alarm(argc=2)
0000009C: popz