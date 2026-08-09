// gml_Object_upfaro1_Destroy_0  locals=1 args=0 len=68
// locals: arguments
00000000: push.imm.e 111
00000004: pushenv 0x20B7B5C
00000008: call action_kill_object(argc=0)
00000010: popz
00000014: popenv 0x40B7B50
00000018: push.imm.e 112
0000001C: conv.i.v
00000020: push.v y
00000028: push.imm.e 50
0000002C: sub.i.v
00000030: push.v x
00000038: call instance_create(argc=3)
00000040: popz