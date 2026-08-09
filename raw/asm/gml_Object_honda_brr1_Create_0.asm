// gml_Object_honda_brr1_Create_0  locals=2 args=0 len=552
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: call action_if_dice(argc=1)
00000024: pop.v.v local.__b__
0000002C: push.local.v local.__b__
00000034: conv.v.b
00000038: bf 0x20A1158
0000003C: push.imm.e 1027
00000040: conv.i.v
00000044: push.imm.e 2907
00000048: conv.i.v
0000004C: push.imm.e 31
00000050: conv.i.v
00000054: call action_create_object(argc=3)
0000005C: popz
00000060: call action_kill_object(argc=0)
00000068: popz
0000006C: push.imm.e 2
00000070: conv.i.v
00000074: call action_if_dice(argc=1)
0000007C: pop.v.v local.__b__
00000084: push.local.v local.__b__
0000008C: conv.v.b
00000090: bf 0x20A11B0
00000094: push.imm.e 1027
00000098: conv.i.v
0000009C: push.imm.e 2907
000000A0: conv.i.v
000000A4: push.imm.e 32
000000A8: conv.i.v
000000AC: call action_create_object(argc=3)
000000B4: popz
000000B8: call action_kill_object(argc=0)
000000C0: popz
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: push.imm.e 1
000000D0: conv.i.v
000000D4: push.imm.e 736
000000D8: conv.i.v
000000DC: call action_if_number(argc=3)
000000E4: pop.v.v local.__b__
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x20A122C
000000FC: push.imm.e 1
00000100: conv.i.v
00000104: call action_set_relative(argc=1)
0000010C: popz
00000110: push.imm.e -26
00000114: conv.i.v
00000118: push.imm.e 21
0000011C: conv.i.v
00000120: call action_move_to(argc=2)
00000128: popz
0000012C: push.imm.e 0
00000130: conv.i.v
00000134: call action_set_relative(argc=1)
0000013C: popz
00000140: push.imm.e 0
00000144: conv.i.v
00000148: push.imm.e 200
0000014C: conv.i.v
00000150: call action_set_alarm(argc=2)
00000158: popz
0000015C: push.imm.e 1
00000160: conv.i.v
00000164: push.imm.e 427
00000168: conv.i.v
0000016C: call action_set_alarm(argc=2)
00000174: popz
00000178: push.imm.e 3
0000017C: conv.i.v
00000180: push.imm.e 210
00000184: conv.i.v
00000188: call action_set_motion(argc=2)
00000190: popz
00000194: push.imm.e 455
00000198: pushenv 0x20A12C4
0000019C: push.imm.e 0
000001A0: conv.i.v
000001A4: push.imm.e 1
000001A8: conv.i.v
000001AC: push.v night
000001B4: call action_if_variable(argc=3)
000001BC: pop.v.v local.__b__
000001C4: push.local.v local.__b__
000001CC: conv.v.b
000001D0: bf 0x20A12C4
000001D4: b 0x20A12CC
000001D8: popenv 0x40A1288
000001DC: b 0x20A12D0
000001E0: popenv 0x1CA12CC
000001E4: push.local.v local.__b__
000001EC: conv.v.b
000001F0: bf 0x20A1300
000001F4: push.imm.e 1
000001F8: conv.i.v
000001FC: push.i 16366009
00000204: conv.i.v
00000208: call action_sprite_color(argc=2)
00000210: popz
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: call action_set_relative(argc=1)
00000224: popz